// Ініціалізація Telegram Web App
function initTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tgWebApp = window.Telegram.WebApp;
        
        // Розгортаємо Web App на весь екран
        tgWebApp.expand();
        
        // Отримуємо дані користувача
        const user = tgWebApp.initDataUnsafe.user;
        
        if (user) {
            // Показуємо форму додавання товару
            document.getElementById('tgAuthWidget').style.display = 'none';
            document.getElementById('productForm').style.display = 'block';
            
            // Додаємо ім'я користувача
            const form = document.getElementById('addProductForm');
            form.insertAdjacentHTML('afterbegin', 
                `<p>Ви авторизовані як: ${user.first_name || 'Користувач'}</p>`);
        }
        
        // Обробник відправки форми
        document.getElementById('addProductForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            // Тут буде логіка додавання товару
            alert('Товар успішно додано!');
            tgWebApp.close();
        });
    }
}

// Ініціалізація Telegram Login Widget
function initTelegramAuth() {
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute('data-telegram-login', 'yourmarketbot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', 'https://yourusername.github.io/marketplace-telegram/auth.html');
    script.setAttribute('data-request-access', 'write');
    
    document.getElementById('tgAuthWidget').appendChild(script);
}

// Ініціалізація Telegram кнопки підтримки
function initTelegramSupport() {
    const tgSupportBtn = document.getElementById('tgSupportBtn');
    tgSupportBtn.addEventListener('click', (e) => {
        if (window.Telegram && window.Telegram.WebApp) {
            e.preventDefault();
            window.Telegram.WebApp.openTelegramLink(tgSupportBtn.href);
        }
    });
}

// Ініціалізація всіх Telegram інтеграцій
document.addEventListener('DOMContentLoaded', () => {
    initTelegramWebApp();
    initTelegramAuth();
    initTelegramSupport();
});