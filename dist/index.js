"use strict";

// Sign In //
const user = {
  email: "ibadat@gmail.com",
  password: "123456789",
};

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const invalidError = document.getElementById("invalid-error");
  const rememberMe = document.getElementById("remember-me");

  const signInButton = document.getElementById("sign-in");

  window.addEventListener("load", () => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      emailInput.value = storedEmail;
      passwordInput.value = storedPassword;
      rememberMe.checked = true;
    }
  });

  signInButton.addEventListener("click", function (e) {
    e.preventDefault();

    if (
      emailInput.value === user.email &&
      passwordInput.value === user.password
    ) {
      invalidError.classList.add("hidden");

      // Remember me functionality
      if (rememberMe.checked) {
        localStorage.setItem("email", emailInput.value);
        localStorage.setItem("password", passwordInput.value);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      alert("Signed in successfully!");

      // Redirect to dashboard page
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password.");
      emailInput.value = "";
      passwordInput.value = "";
      invalidError.classList.remove("hidden");
    }
  });
});
