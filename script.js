const ADMIN_PASSWORD = "qwerty123"; // Замени на свой пароль

function login() {
  const password = document.getElementById("adminPassword").value;
  const errorMessage = document.getElementById("loginError");

  if (password === ADMIN_PASSWORD) {
    document.getElementById("loginContainer").classList.add("hidden");
    document.getElementById("mainContainer").classList.remove("hidden");
  } else {
    errorMessage.classList.remove("hidden");
  }
}
