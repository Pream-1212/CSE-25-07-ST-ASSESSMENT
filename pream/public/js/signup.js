const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phoneOrEmail = document.getElementById("phone");
  const password = document.getElementById("password");

  // Reset previous errors
  document.querySelectorAll(".error").forEach((el) => el.remove());
  phoneOrEmail.classList.remove("error-input");
  password.classList.remove("error-input");

  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneOrEmail: phoneOrEmail.value,
      password: password.value,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    // Validation failed — highlight fields
    if (data.errors.phoneOrEmail) {
      phoneOrEmail.classList.add("error-input");
      showError(phoneOrEmail, data.errors.phoneOrEmail);
    }
    if (data.errors.password) {
      password.classList.add("error-input");
      showError(password, data.errors.password);
    }
  } else {
    alert("Login successful!");
    window.location.href = "/success.html";
  }
});

function showError(input, message) {
  const span = document.createElement("span");
  span.className = "error";
  span.style.color = "red";
  span.style.fontSize = "0.9em";
  span.textContent = message;
  input.insertAdjacentElement("afterend", span);
}
