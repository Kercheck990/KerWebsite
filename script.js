console.log("Script загружен и выполняется");

const ADMIN_PASSWORD = "supersecret"; // Пароль для админки
const GROVE_PASSWORD = "grovepass"; // Пароль для Groove
const BALLAS_PASSWORD = "ballaspass"; // Пароль для Ballas
let selectedGroup = null;

function selectGroup(group) {
  selectedGroup = group;
  document.getElementById("introContainer").classList.add("hidden");
  document.getElementById("loginContainer").classList.remove("hidden");

  // Отображаем название группы на экране
  document.getElementById("groupName").innerText = `Пароль для ${group.charAt(0).toUpperCase() + group.slice(1)}`;

  // Очистим поле ввода пароля и скрыть сообщение об ошибке
  document.getElementById("adminPassword").value = "";
  document.getElementById("loginError").classList.add("hidden");
}

function login() {
  const password = document.getElementById("adminPassword").value.trim();

  // Проверяем правильность пароля в зависимости от выбранной группы
  if (selectedGroup === "grove" && password === GROVE_PASSWORD) {
    showLeaderPanel();
  } else if (selectedGroup === "ballas" && password === BALLAS_PASSWORD) {
    showLeaderPanel();
  } else {
    document.getElementById("loginError").classList.remove("hidden");
  }
}

function showLeaderPanel() {
  document.getElementById("loginContainer").classList.add("hidden");
  document.getElementById("mainContainer").classList.remove("hidden");

  // Показываем только выбранную группу
  if (selectedGroup === "grove") {
    document.getElementById("grove").style.display = "block";
    document.getElementById("ballas").style.display = "none";
  } else if (selectedGroup === "ballas") {
    document.getElementById("ballas").style.display = "block";
    document.getElementById("grove").style.display = "none";
  }
}

function editUser() {
  const user = document.getElementById("userSelect").value;
  alert(`Редактирование пользователя: ${user}`); // Здесь можно добавить логику редактирования
}
