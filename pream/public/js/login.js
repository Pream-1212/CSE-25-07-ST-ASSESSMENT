document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const errorPhone = document.getElementById("errorPhone");
  const errorPassword = document.getElementById("errorPassword");

  form.addEventListener("submit", (e) => {
    let valid = true;

    // Reset previous errors
    errorPhone.textContent = "";
    errorPassword.textContent = "";
    phoneInput.style.border = "";
    passwordInput.style.border = "";

    // Validate phone/email
    if (phoneInput.value.trim() === "") {
      errorPhone.textContent = "Email or phone number is required";
      phoneInput.style.border = "2px solid red";
      valid = false;
    }

    // Validate password
    if (passwordInput.value.trim() === "") {
      errorPassword.textContent = "Password is required";
      passwordInput.style.border = "2px solid red";
      valid = false;
    }

    if (!valid) {
      e.preventDefault(); // stop form submission
    }
  });
});
