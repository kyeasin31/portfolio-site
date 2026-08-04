function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const toggleBtn = document.getElementById("toggleTheme");

    if (toggleBtn) {
        toggleBtn.checked = theme === "dark";
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
        applyTheme(savedTheme);
    } else {
        applyTheme("light");
    }
}

function setupThemeToggle() {
    const toggleBtn = document.getElementById("toggleTheme");

    if (!toggleBtn) {
        console.error("Theme toggle checkbox was not found.");
        return;
    }

    const currentTheme =
        document.body.getAttribute("data-theme") || "light";

    toggleBtn.checked = currentTheme === "dark";

    toggleBtn.addEventListener("change", function () {
        const newTheme = toggleBtn.checked ? "dark" : "light";
        applyTheme(newTheme);
    });
}

// Apply the saved theme when the initial page is ready.
document.addEventListener("DOMContentLoaded", function () {
    loadSavedTheme();
});