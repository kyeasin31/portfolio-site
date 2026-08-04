function loadComponent(selector, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load " + filePath);
            }

            return response.text();
        })
        .then(html => {
            const placeholder = document.querySelector(selector);

            if (!placeholder) {
                throw new Error(
                    "Could not find placeholder: " + selector
                );
            }

            placeholder.innerHTML = html;

            if (selector === "#nav-placeholder") {
                setupThemeToggle();
            }
        })
        .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent(
        "#nav-placeholder",
        "components/header.html"
    );

    loadComponent(
        "#footer-placeholder",
        "components/footer.html"
    );
});