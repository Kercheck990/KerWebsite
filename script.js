const ADMIN_PASSWORD = "supersecret"; // Замени на свой пароль

function login() {
  const password = document.getElementById("adminPassword").value;
  if (password === ADMIN_PASSWORD) {
    document.getElementById("loginContainer").classList.add("hidden");
    document.getElementById("mainContainer").classList.remove("hidden");
  } else {
    document.getElementById("loginError").innerText = "Неверный пароль!";
  }
}
