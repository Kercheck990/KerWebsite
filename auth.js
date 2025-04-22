// Реєстрація
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  try {
    Database.register({
      login: document.getElementById('login').value,
      password: document.getElementById('password').value,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      telegram: document.getElementById('telegram').value,
      phone: document.getElementById('phone').value,
      orders: [],
      registeredAt: new Date().toISOString()
    });
    
    alert('Реєстрація успішна!');
    window.location.href = 'login.html';
  } catch (error) {
    alert(error.message);
  }
});

// Вхід
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  try {
    const user = Database.login(
      document.getElementById('login').value,
      document.getElementById('password').value
    );
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'cabinet.html';
  } catch (error) {
    alert(error.message);
  }
});
