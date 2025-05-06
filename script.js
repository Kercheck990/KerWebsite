const ADMIN_PASSWORD = "supersecret"; // Пароль для админки
const LEADER_PASSWORD = "123123123"; // Пароль для лидера

function login() {
  const password = document.getElementById("adminPassword").value;
  if (password === LEADER_PASSWORD) {
    window.location.href = "leaderPanel.html"; // Переход в панель лидера
  } else {
    document.getElementById("loginError").classList.remove("hidden");
  }
}

function goToAdminPanel() {
  window.location.href = "adminPanel.html"; // Переход в админ панель
}

function accessAdminPanel() {
  const password = document.getElementById("adminPassword").value;
  if (password === ADMIN_PASSWORD) {
    window.location.href = "adminPanel.html"; // Переход в админ панель
  } else {
    document.getElementById("adminLoginError").classList.remove("hidden");
  }
}

function goToManageUsers() {
  window.location.href = "manageUsers.html"; // Переход в страницу управления пользователями
}

function editUser() {
  const user = document.getElementById("userSelect").value;
  alert(`Редактирование пользователя: ${user}`); // Здесь можно добавить логику редактирования
}
