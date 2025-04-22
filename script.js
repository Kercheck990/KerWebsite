document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // �������� ��� �������� �� ����!
  const BOT_TOKEN = '���_�����_����'; // �������� � @BotFather
  const CHAT_ID = '���_CHAT_ID'; // �������� � @userinfobot
  
  const formData = new FormData(this);
  
  const text = `?? ����� ������ �� ����:
  ?? ���: ${formData.get('name')}
  ?? Telegram: ${formData.get('telegram')}
  ?? ���������: ${formData.get('message')}`;

  // �������� ����� Telegram API
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
    alert('? ������ ����������! � ������� � ���� � Telegram.');
    document.getElementById('orderForm').reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('? ������ ��������. ����������, �������� ��� �������� � Telegram.');
  });
});