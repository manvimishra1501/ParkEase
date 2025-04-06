document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    // Password visibility toggle
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁";
        }
    });

    // Form submission handling
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        // Simulating login process (replace with real authentication logic)
        alert("Login successful for " + email);
        window.location.href = "dashboard.html"; // Redirect after successful login
    });
});
document.getElementById("googleLogin").addEventListener("click", function() {
    window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email profile";
});

document.getElementById("facebookLogin").addEventListener("click", function() {
    window.location.href = "https://www.facebook.com/v12.0/dialog/oauth?client_id=YOUR_FACEBOOK_APP_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email,public_profile";
});

