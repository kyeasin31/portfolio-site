document.addEventListener("DOMContentLoaded", function () {
    const blogList = document.getElementById("blog-list");
    const filterButtons = document.querySelectorAll(".filter-button");

    let allPosts = [];

    fetch("data/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load blog posts.");
            }

            return response.json();
        })
        .then(posts => {
            posts.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });

            allPosts = posts;

            // Show every blog post when the page first loads.
            displayPosts(allPosts);
        })
        .catch(error => {
            console.error("Error loading posts:", error);

            blogList.innerHTML = `
                <p>Blog posts could not be loaded.</p>
            `;
        });

    function displayPosts(postsToDisplay) {
        blogList.innerHTML = "";

        postsToDisplay.forEach(post => {
            const postElement = document.createElement("article");
            postElement.classList.add("project-sec");

            /*
             * The first item in allPosts is the newest post because the
             * complete array was sorted from newest to oldest.
             */
            const isLatestPost =
                allPosts.length > 0 &&
                post.id === allPosts[0].id;

            const latestBadge = isLatestPost
                ? '<span class="latest-badge">Latest Post</span>'
                : "";

            const formattedDate = new Date(
                post.date + "T00:00:00"
            ).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            postElement.innerHTML = `
                <a
                    class="blog-card-link"
                    href="post.html?id=${post.id}"
                >
                    <img
                        class="project-image"
                        src="${post.image}"
                        alt="${post.title}"
                    >

                    <div class="project-info">
                        <div class="post-heading">
                            <h2>${post.title}</h2>
                            ${latestBadge}
                        </div>

                        <p class="post-meta">
                            ${formattedDate} · ${post.category}
                        </p>

                        <p>${post.summary}</p>
                    </div>
                </a>
            `;

            blogList.appendChild(postElement);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedCategory = this.dataset.filter;

            // Remove active styling from every button.
            filterButtons.forEach(filterButton => {
                filterButton.classList.remove("active");
            });

            // Highlight the button that was clicked.
            this.classList.add("active");

            if (selectedCategory === "All") {
                displayPosts(allPosts);
            } else {
                const filteredPosts = allPosts.filter(post => {
                    return post.category === selectedCategory;
                });

                displayPosts(filteredPosts);
            }
        });
    });
});