document.addEventListener("DOMContentLoaded", function () {
    const projectDetails = document.getElementById("project-details");

    const urlParameters = new URLSearchParams(
        window.location.search
    );

    const projectId = urlParameters.get("id");

    if (!projectId) {
        showError("No project was selected.");
        return;
    }

    fetch("data/project.json")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Unable to load project data.");
            }

            return response.json();
        })
        .then(function (projects) {
            const selectedProject = projects.find(
                function (project) {
                    return project.id === projectId;
                }
            );

            if (!selectedProject) {
                showError("The requested project could not be found.");
                return;
            }

            displayProject(selectedProject);
        })
        .catch(function (error) {
            console.error("Error loading project:", error);
            showError("The project could not be loaded.");
        });

    function displayProject(project) {
        document.title = project.title + " | My Portfolio";

        const technologyHTML = project.technologies
            .map(function (technology) {
                return `
                    <span class="technology-badge">
                        ${technology}
                    </span>
                `;
            })
            .join("");

        const goalsHTML = project.goals
            .map(function (goal) {
                return `<li>${goal}</li>`;
            })
            .join("");

        const featuresHTML = project.features
            .map(function (feature) {
                return `<li>${feature}</li>`;
            })
            .join("");

        const processHTML = project.process
            .map(function (step, index) {
                return `
                    <div class="process-step">
                        <span class="process-number">
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

        const challengesHTML = project.challenges
            .map(function (challenge) {
                return `
                    <div class="challenge-card">
                        <h3>${challenge.title}</h3>
                        <p>${challenge.description}</p>
                    </div>
                `;
            })
            .join("");

        const galleryHTML = project.gallery
            .map(function (image, index) {
                return `
                    <img
                        src="${image}"
                        alt="${project.title} screenshot ${index + 1}"
                        class="gallery-image"
                    >
                `;
            })
            .join("");

        projectDetails.innerHTML = `
            <article class="project-case-study">

                <section class="project-hero">
                    <img
                        src="${project.image}"
                        alt="${project.title}"
                        class="project-hero-image"
                    >

                    <div class="project-hero-content">
                        <p class="project-category">
                            ${project.category}
                        </p>

                        <h1>${project.title}</h1>

                        <p class="project-summary">
                            ${project.summary}
                        </p>

                        ${
                            project.websiteUrl
                                ? `
                                    <a
                                        href="${project.websiteUrl}"
                                        target="_blank"
                                        rel="noopener"
                                        class="project-link"
                                    >
                                        Visit Website
                                    </a>
                                `
                                : ""
                        }
                    </div>
                </section>

                <section class="project-section">
                    <h2>Project Overview</h2>
                    <p>${project.overview}</p>
                </section>

                <section class="project-section">
                    <h2>My Role</h2>
                    <p>${project.role}</p>
                </section>

                <section class="project-section">
                    <h2>Technologies Used</h2>

                    <div class="technology-list">
                        ${technologyHTML}
                    </div>
                </section>

                <section class="project-section">
                    <h2>Project Goals</h2>

                    <ul>
                        ${goalsHTML}
                    </ul>
                </section>

                <section class="project-section">
                    <h2>Development Process</h2>

                    <div class="process-list">
                        ${processHTML}
                    </div>
                </section>

                <section class="project-section">
                    <h2>Key Features</h2>

                    <ul>
                        ${featuresHTML}
                    </ul>
                </section>

                <section class="project-section">
                    <h2>Challenges and Solutions</h2>

                    <div class="challenge-list">
                        ${challengesHTML}
                    </div>
                </section>

                <section class="project-section">
                    <h2>Project Gallery</h2>

                    <div class="project-gallery">
                        ${galleryHTML}
                    </div>
                </section>

                <section class="project-section">
                    <h2>What I Learned</h2>
                    <p>${project.lessons}</p>
                </section>

            </article>
        `;
    }

    function showError(message) {
        projectDetails.innerHTML = `
            <section class="project-error">
                <h1>Project Not Found</h1>
                <p>${message}</p>

                <a href="projects.html">
                    Return to Projects
                </a>
            </section>
        `;
    }
});