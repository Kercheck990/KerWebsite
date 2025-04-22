document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Замените эти значения на свои!
  const BOT_TOKEN = '8157456768:AAFZBNtglu0NmUhe_bsEvOFfA0TdoAAnGmU'; // Получить у @BotFather
  const CHAT_ID = '6004271382'; // Получить у @userinfobot
  
  const formData = new FormData(this);
  
  const text = `📌 Новая заявка на сайт:
  👤 Имя: ${formData.get('name')}
  📱 Telegram: ${formData.get('telegram')}
  ✉️ Сообщение: ${formData.get('message')}`;

  // Отправка через Telegram API
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
      parse_mode: 'HTML'
    })
  })
  .then(response => response.json())
  .then(data => {
    alert('✅ Заявка отправлена! Я свяжусь с вами в Telegram.');
    document.getElementById('orderForm').reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('❌ Ошибка отправки. Пожалуйста, напишите мне напрямую в Telegram.');
  });
});
