// Завантаження товарів
document.addEventListener('DOMContentLoaded', () => {
    // Перевірка теми
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Оновлення іконки теми
    updateThemeIcon(savedTheme);
    
    // Завантаження товарів
    loadProducts();
    
    // Обробник пошуку
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterProducts(e.target.value, document.getElementById('categoryFilter').value);
    });
    
    // Обробник фільтра категорій
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        filterProducts(document.getElementById('searchInput').value, e.target.value);
    });
});

// Функція завантаження товарів
async function loadProducts() {
    try {
        // Тут буде запит до API або GitHub для отримання товарів
        // Поки використовуємо тестові дані
        const products = [
            {
                id: 1,
                title: "Круті кросівки",
                price: "4500 ?",
                image: "assets/images/sneakers.webp",
                tgLink: "https://t.me/seller1",
                category: "clothes"
            },
            {
                id: 2,
                title: "Вінтажна куртка",
                price: "3200 ?",
                image: "assets/images/jacket.webp",
                tgLink: "https://t.me/seller2",
                category: "clothes"
            },
            {
                id: 3,
                title: "Смартфон",
                price: "12500 ?",
                image: "assets/images/phone.webp",
                tgLink: "https://t.me/seller3",
                category: "electronics"
            },
            {
                id: 4,
                title: "Книга 'JavaScript'",
                price: "800 ?",
                image: "assets/images/book.webp",
                tgLink: "https://t.me/seller4",
                category: "books"
            }
        ];
        
        renderProducts(products);
    } catch (error) {
        console.error("Помилка завантаження товарів:", error);
    }
}

// Функція рендеру товарів
function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card animate__animated animate__fadeIn';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="price">${product.price}</p>
                <a href="${product.tgLink}" class="btn tg-btn" target="_blank">
                    <i class="fab fa-telegram"></i> Написати продавцю
                </a>
            </div>
        `;
        productCard.dataset.category = product.category;
        productsGrid.appendChild(productCard);
    });
}

// Функція фільтрації товарів
function filterProducts(searchTerm, category) {
    const products = document.querySelectorAll('.product-card');
    const searchLower = searchTerm.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const productCategory = product.dataset.category;
        
        const matchesSearch = title.includes(searchLower);
        const matchesCategory = category === 'all' || productCategory === category;
        
        if (matchesSearch && matchesCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Переключення теми
document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Оновлення іконки теми
function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}