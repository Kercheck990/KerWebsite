// auth.js — проверяет привязку Telegram и открывает модалку
document.addEventListener("DOMContentLoaded", async () => {
  const modal = document.getElementById("linkModal");
  const linkBtn = document.getElementById("linkBtn");

  // Генерация случайного кода для привязки
  function generateCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  // Проверка localStorage на привязку
  let myId = localStorage.getItem("tg_id"); // сюда можно сохранять user_id после успешной привязки
  let isLinked = localStorage.getItem("tg_linked") === "1";

  try {
    // Загружаем актуальные данные пользователей
    let res = await fetch("users.json?_=" + Date.now()); // анти-кэш
    let users = await res.json();

    let user = users.find(u => u.user_id == myId);

    // Если пользователь не найден или не привязан — показываем модалку
    if (!myId || !user || !user.linked || !isLinked) {
      modal.classList.remove("hidden");

      // Генерируем уникальный код для привязки
      const code = generateCode();
      linkBtn.href = `https://t.me/obshalkaposlannikabot?start=privyazka_${code}`;

      // Сохраняем код локально для последующей проверки
      localStorage.setItem("tg_code", code);

      // Обработчик успешной проверки
      linkBtn.addEventListener("click", () => {
        // Здесь код проверки будет после того, как пользователь введет код на сайте
        // Пока просто скрываем модалку
        modal.classList.add("hidden");
      });
    } else {
      modal.classList.add("hidden");
    }
  } catch (e) {
    console.error("Ошибка загрузки users.json:", e);
    modal.classList.remove("hidden");
  }
});

// Функция для проверки кода, который ввел пользователь на сайте
async function verifyCode(inputCode) {
  const storedCode = localStorage.getItem("tg_code");
  if (inputCode === storedCode) {
    localStorage.setItem("tg_linked", "1");
    alert("✅ Привязка успешна!");
    document.getElementById("linkModal").classList.add("hidden");
    return true;
  } else {
    alert("❌ Код неверный");
    return false;
  }
}
