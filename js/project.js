document.addEventListener("DOMContentLoaded", function () {

    const projectList = document.getElementById("project-list");
    const filterButtons = document.querySelectorAll(".filter-button");

    let projects = [];

    fetch("data/project.json")
        .then(response => response.json())
        .then(data => {

            projects = data;

            // Display every project when the page loads
            displayProjects(projects);

        })
        .catch(error => console.error(error));

    function displayProjects(projectArray) {

        projectList.innerHTML = "";

        projectArray.forEach(project => {

            const card = document.createElement("article");

            card.classList.add("project-card");

            card.innerHTML = `
                <a href="project-details.html?id=${project.id}" class="project-card-link">

                    <img
                        class="project-image"
                        src="${project.image}"
                        alt="${project.title}"
                    >

                    <div class="project-info">

                        <h2>${project.title}</h2>

                        <p class="card-category">
                            ${project.category}
                        </p>

                        <p>${project.summary}</p>

                    </div>

                </a>
            `;

            projectList.appendChild(card);

        });

    }

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            const category = this.dataset.filter;

            if (category === "All") {

                displayProjects(projects);

            } else {

                const filteredProjects = projects.filter(project => {

                    return project.category === category;

                });

                displayProjects(filteredProjects);

            }

        });

    });

});