// ����������� Telegram Web App
function initTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tgWebApp = window.Telegram.WebApp;
        
        // ���������� Web App �� ���� �����
        tgWebApp.expand();
        
        // �������� ��� �����������
        const user = tgWebApp.initDataUnsafe.user;
        
        if (user) {
            // �������� ����� ��������� ������
            document.getElementById('tgAuthWidget').style.display = 'none';
            document.getElementById('productForm').style.display = 'block';
            
            // ������ ��'� �����������
            const form = document.getElementById('addProductForm');
            form.insertAdjacentHTML('afterbegin', 
                `<p>�� ����������� ��: ${user.first_name || '����������'}</p>`);
        }
        
        // �������� �������� �����
        document.getElementById('addProductForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            // ��� ���� ����� ��������� ������
            alert('����� ������ ������!');
            tgWebApp.close();
        });
    }
}

// ����������� Telegram Login Widget
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

// ����������� Telegram ������ ��������
function initTelegramSupport() {
    const tgSupportBtn = document.getElementById('tgSupportBtn');
    tgSupportBtn.addEventListener('click', (e) => {
        if (window.Telegram && window.Telegram.WebApp) {
            e.preventDefault();
            window.Telegram.WebApp.openTelegramLink(tgSupportBtn.href);
        }
    });
}

// ����������� ��� Telegram ����������
document.addEventListener('DOMContentLoaded', () => {
    initTelegramWebApp();
    initTelegramAuth();
    initTelegramSupport();
});