const API_URL = "http://127.0.0.1:8000";

document.getElementById("register-form").addEventListener("submit", async function (e) {

    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                fullname,
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Registration Successful!");

            window.location.href = "login.html";

        } else {

            alert(data.detail || "Registration Failed");

        }

    } catch (error) {

        console.error(error);

        alert("Cannot connect to backend.");

    }

});