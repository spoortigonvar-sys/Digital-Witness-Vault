const API_URL = "http://127.0.0.1:8000";

document.getElementById("login-form").addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(`${API_URL}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("Login Successful!");

            // Redirect to upload page
            window.location.href = "upload.html";

        } else {

            alert(data.detail || "Invalid Email or Password");

        }

    } catch (error) {

        console.error(error);

        alert("Cannot connect to backend.");

    }

});