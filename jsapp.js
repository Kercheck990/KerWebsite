// ������������ ������
document.addEventListener('DOMContentLoaded', () => {
    // �������� ����
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // ��������� ������ ����
    updateThemeIcon(savedTheme);
    
    // ������������ ������
    loadProducts();
    
    // �������� ������
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterProducts(e.target.value, document.getElementById('categoryFilter').value);
    });
    
    // �������� ������� ��������
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        filterProducts(document.getElementById('searchInput').value, e.target.value);
    });
});

// ������� ������������ ������
async function loadProducts() {
    try {
        // ��� ���� ����� �� API ��� GitHub ��� ��������� ������
        // ���� ������������� ������ ���
        const products = [
            {
                id: 1,
                title: "���� �������",
                price: "4500 ?",
                image: "assets/images/sneakers.webp",
                tgLink: "https://t.me/seller1",
                category: "clothes"
            },
            {
                id: 2,
                title: "³������ ������",
                price: "3200 ?",
                image: "assets/images/jacket.webp",
                tgLink: "https://t.me/seller2",
                category: "clothes"
            },
            {
                id: 3,
                title: "��������",
                price: "12500 ?",
                image: "assets/images/phone.webp",
                tgLink: "https://t.me/seller3",
                category: "electronics"
            },
            {
                id: 4,
                title: "����� 'JavaScript'",
                price: "800 ?",
                image: "assets/images/book.webp",
                tgLink: "https://t.me/seller4",
                category: "books"
            }
        ];
        
        renderProducts(products);
    } catch (error) {
        console.error("������� ������������ ������:", error);
    }
}

// ������� ������� ������
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
                    <i class="fab fa-telegram"></i> �������� ��������
                </a>
            </div>
        `;
        productCard.dataset.category = product.category;
        productsGrid.appendChild(productCard);
    });
}

// ������� ���������� ������
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

// ������������ ����
document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// ��������� ������ ����
function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}