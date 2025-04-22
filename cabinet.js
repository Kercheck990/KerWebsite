document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  // Заповнюємо дані профілю
  document.getElementById('userName').textContent = 
    `${currentUser.firstName} ${currentUser.lastName}`;
  
  document.getElementById('editFirstName').value = currentUser.firstName || '';
  // ... заповнюємо інші поля ...

  // Статистика
  document.getElementById('totalOrders').textContent = currentUser.orders?.length || 0;
  document.getElementById('regDate').textContent = 
    new Date(currentUser.registeredAt).toLocaleDateString('uk-UA');

  // Історія замовлень
  const ordersTable = document.getElementById('ordersTable').querySelector('tbody');
  if (currentUser.orders?.length) {
    currentUser.orders.forEach(order => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${new Date(order.date).toLocaleString('uk-UA')}</td>
        <td>${order.product}</td>
        <td>${order.status || 'В обробці'}</td>
      `;
      ordersTable.appendChild(row);
    });
  }

  // Вихід
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });

  // Оновлення профілю
  document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedData = {
      firstName: document.getElementById('editFirstName').value,
      // ... інші поля ...
    };
    
    Database.updateUser(currentUser.login, updatedData);
    alert('Дані збережено!');
    window.location.reload();
  });
});
