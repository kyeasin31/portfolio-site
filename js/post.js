document.addEventListener("DOMContentLoaded", function () {
    const postDetails = document.getElementById("post-details");

    // Read the query string from the current URL.
    const urlParameters = new URLSearchParams(
        window.location.search
    );

    // For post.html?id=dark-mode, this becomes "dark-mode".
    const postId = urlParameters.get("id");

    if (!postId) {
        showError("No blog post was selected.");
        return;
    }

    fetch("data/data.json")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Unable to load blog post data.");
            }

            return response.json();
        })
        .then(function (posts) {
            const selectedPost = posts.find(function (post) {
                return post.id === postId;
            });

            if (!selectedPost) {
                showError("The requested blog post could not be found.");
                return;
            }

            displayPost(selectedPost);
        })
        .catch(function (error) {
            console.error("Error loading blog post:", error);
            showError("The blog post could not be loaded.");
        });

    function displayPost(post) {
        document.title = post.title + " | My Blog";

        const formattedDate = new Date(
            post.date + "T00:00:00"
        ).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        const approachHTML = post.approach
            .map(function (step, index) {
                return `
                    <div class="blog-process-step">
                        <span class="blog-process-number">
                            ${index + 1}
                        </span>

                        <div>
                            <h3>${step.title}</h3>
                            <p>${step.description}</p>
                        </div>
                    </div>
                `;
            })
            .join("");

        const challengesHTML = post.challenges
            .map(function (challenge) {
                return `
                    <div class="blog-challenge-card">
                        <h3>${challenge.title}</h3>
                        <p>${challenge.description}</p>
                    </div>
                `;
            })
            .join("");

        const lessonsHTML = post.lessons
            .map(function (lesson) {
                return `<li>${lesson}</li>`;
            })
            .join("");

        postDetails.innerHTML = `
            <header class="blog-post-hero">
                <img
                    class="blog-post-image"
                    src="${post.image}"
                    alt="Cover image for ${post.title}"
                >

                <div class="blog-post-heading">
                    <p class="blog-post-category">
                        ${post.category}
                    </p>

                    <h1>${post.title}</h1>

                    <p class="blog-post-meta">
                        Published ${formattedDate}
                    </p>

                    <p class="blog-post-summary">
                        ${post.summary}
                    </p>
                </div>
            </header>

            <section class="blog-post-section">
                <h2>Introduction</h2>
                <p>${post.introduction}</p>
            </section>

            <section class="blog-post-section">
                <h2>What the Feature Does</h2>
                <p>${post.feature}</p>
            </section>

            <section class="blog-post-section">
                <h2>How I Implemented It</h2>

                <div class="blog-process-list">
                    ${approachHTML}
                </div>
            </section>

            <section class="blog-post-section">
                <h2>Challenges I Encountered</h2>

                <div class="blog-challenge-list">
                    ${challengesHTML}
                </div>
            </section>

            <section class="blog-post-section">
                <h2>What I Learned</h2>

                <ul class="blog-lessons-list">
                    ${lessonsHTML}
                </ul>
            </section>

            <section class="blog-post-section">
                <h2>Conclusion</h2>
                <p>${post.conclusion}</p>
            </section>
        `;
    }

    function showError(message) {
        postDetails.innerHTML = `
            <section class="blog-post-error">
                <h1>Post Not Found</h1>
                <p>${message}</p>

                <a href="blog.html" class="back-link">
                    Return to Blog
                </a>
            </section>
        `;
    }
});