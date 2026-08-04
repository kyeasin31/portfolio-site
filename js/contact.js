document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("form-success");

    if (!form) {
        return;
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(
            `${fieldId}-error`
        );

        errorElement.textContent = message;
        errorElement.classList.add("visible");

        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");
    }

    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(
            `${fieldId}-error`
        );

        errorElement.textContent = "";
        errorElement.classList.remove("visible");

        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        const name = document
            .getElementById("name")
            .value
            .trim();

        const subject = document
            .getElementById("subject")
            .value
            .trim();
        const email = document
            .getElementById("email")
            .value
            .trim();

        const message = document
            .getElementById("message")
            .value
            .trim();

        clearError("name");
        clearError("subject");
        clearError("email");
        clearError("message");

        if (name === "") {
            showError(
                "name",
                "Please enter your name."
            );

            isValid = false;
        }
        if (subject === "") {
            showError(
                "subject",
                "Please enter a subject."
            );

            isValid = false;
        }

        if (email === "") {
            showError(
                "email",
                "Please enter your email address."
            );

            isValid = false;
        } else if (!validateEmail(email)) {
            showError(
                "email",
                "Please enter a valid email address."
            );

            isValid = false;
        }

        if (message === "") {
            showError(
                "message",
                "Please enter a message."
            );

            isValid = false;
        } else if (message.length < 20) {
            showError(
                "message",
                "Your message must contain at least 20 characters."
            );

            isValid = false;
        }

        if (isValid) {
            form.hidden = true;

            successMessage.textContent =
                "Thank you! Your message has been submitted successfully.";

            successMessage.hidden = false;
        }
    });

    ["name", "subject", "email", "message"].forEach(function (id) {
        const field = document.getElementById(id);

        field.addEventListener("input", function () {
            clearError(id);
        });
    });
});