document.addEventListener('DOMContentLoaded', function() {
    // Налаштування
    const BOT_TOKEN = 'ВАШ_ТОКЕН_БОТА';
    const CHAT_ID = 'ID_ЧАТУ'; // ID групи або вашого чату
    
    // Зміна плейсхолдера для контакту
    document.getElementById('contactType').addEventListener('change', function() {
        const contactInput = document.getElementById('contact');
        if (this.value === 'telegram') {
            contactInput.placeholder = "Наприклад: @username";
        } else {
            contactInput.placeholder = "Наприклад: 991234567";
        }
    });
    
    // Обробка форми
    document.getElementById('requestForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Отримання даних форми
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const contactType = formData.get('contactType');
        let contact = formData.get('contact').trim();
        const product = formData.get('product');
        const comment = formData.get('comment').trim();
        
        // Валідація та форматування контакту
        if (contactType === 'telegram') {
            if (!contact.startsWith('@')) {
                contact = '@' + contact;
            }
        } else {
            // Видаляємо всі нецифрові символи
            contact = contact.replace(/\D/g, '');
            // Додаємо +380, якщо номер не містить коду країни
            if (!contact.startsWith('380') && contact.length === 9) {
                contact = '380' + contact;
            }
            contact = '+' + contact;
        }
        
        // Формування повідомлення для Telegram
        const message = `🛒 <b>Нове замовлення!</b>\n\n` +
                       `👤 <b>Ім'я:</b> ${name}\n` +
                       `📞 <b>Контакт:</b> ${contact}\n` +
                       `🛍 <b>Товар:</b> ${product}\n` +
                       `💬 <b>Коментар:</b> ${comment || 'немає'}`;
        
        try {
            // Відправка повідомлення через Telegram API
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert('✅ Заявку успішно відправлено! Очікуйте повідомлення у Telegram.');
                this.reset();
            } else {
                throw new Error(result.description || 'Помилка відправки');
            }
        } catch (error) {
            console.error('Помилка:', error);
            alert('❌ Помилка при відправці заявки. Спробуйте ще раз або напишіть напряму: @marketplace_bot');
        }
    });
});
