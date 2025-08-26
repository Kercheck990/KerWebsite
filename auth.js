// auth.js — проверяет привязку Telegram и открывает модалку
async function checkUser() {
  try {
    let res = await fetch("users.json?_=" + Date.now()); // анти-кэш
    let users = await res.json();

    let myId = localStorage.getItem("tg_id");
    let modal = document.getElementById("linkModal");

    // Если нет localStorage или пользователь не привязан → показываем модалку
    if (!myId) {
      modal.style.display = "flex";
      return;
    }

    let user = users.find(u => u.user_id == myId);
    if (!user || !user.linked) {
      modal.style.display = "flex";
    } else {
      modal.style.display = "none";
    }
  } catch (e) {
    console.error("Ошибка загрузки users.json:", e);
    document.getElementById("linkModal").style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const modal = document.getElementById("linkModal");

  // Проверяем через API, привязан ли пользователь
  const res = await fetch("/api/check-linked"); // Сервер возвращает { linked: true/false }
  const data = await res.json();

  if (!data.linked) {
    modal.classList.remove("hidden"); // Показываем модалку
  } else {
    modal.classList.add("hidden"); // Скрываем
  }
});

// Запуск при загрузке страницы
window.addEventListener("load", checkUser);
