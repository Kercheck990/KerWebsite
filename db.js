// Імітація бази даних через LocalStorage
const Database = {
  users: JSON.parse(localStorage.getItem('marketplace_users')) || [],

  // Реєстрація нового користувача
  register(user) {
    if (this.users.some(u => u.login === user.login)) {
      throw new Error('Цей логін вже зайнятий');
    }
    this.users.push(user);
    this._save();
  },

  // Вхід
  login(login, password) {
    const user = this.users.find(u => u.login === login && u.password === password);
    if (!user) throw new Error('Невірний логін або пароль');
    return user;
  },

  // Оновлення даних
  updateUser(login, newData) {
    const user = this.users.find(u => u.login === login);
    if (!user) throw new Error('Користувача не знайдено');
    Object.assign(user, newData);
    this._save();
  },

  // Збереження в LocalStorage
  _save() {
    localStorage.setItem('marketplace_users', JSON.stringify(this.users));
  }
};
