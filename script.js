const items = [];

function toggleModal() {
  const modal = document.getElementById('registerModal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function registerUser() {
  const name = document.getElementById('regName').value;
  const telegram = document.getElementById('regTelegram').value;
  const password = document.getElementById('regPassword').value;

  if (name && telegram && password) {
    alert('Регистрация успешна!');
    toggleModal();
  } else {
    alert('Пожалуйста, заполните все поля.');
  }
}

function addItem() {
  const category = document.getElementById('categorySelect').value;
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;

  if (title && description && price && category) {
    items.push({ category, title, description, price });
    showItems();
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
  } else {
    alert('Заполните все поля.');
  }
}

function showItems() {
  const selectedCategory = document.getElementById('categorySelect').value;
  const container = document.getElementById('itemsContainer');
  const form = document.getElementById('itemForm');
  const list = document.getElementById('itemList');
  container.innerHTML = '';

  form.style.display = selectedCategory ? 'block' : 'none';
  list.style.display = selectedCategory ? 'block' : 'none';

  items.filter(item => item.category === selectedCategory).forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p><p><strong>Цена:</strong> ${item.price}</p>`;
    container.appendChild(div);
  });
}
