// script.js
let currentUser = null;

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("panel").classList.remove("hidden");
    document.getElementById("factionName").textContent = user.faction;
    showSection("leader");
  } else {
    document.getElementById("loginError").textContent = "Неверный логин или пароль";
  }
}

function logout() {
  currentUser = null;
  document.getElementById("panel").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
}

function showSection(section) {
  document.getElementById("leaderSection").classList.add("hidden");
  document.getElementById("logsSection").classList.add("hidden");

  if (section === "leader") {
    const data = leaders[currentUser.faction];
    document.getElementById("leaderInfo").innerHTML = `<b>${data.name}</b><br>${data.stats}`;
    document.getElementById("leaderSection").classList.remove("hidden");
  } else if (section === "logs") {
    const list = document.getElementById("logsList");
    list.innerHTML = "";
    logs[currentUser.faction].forEach(l => {
      const li = document.createElement("li");
      li.textContent = l;
      list.appendChild(li);
    });
    document.getElementById("logsSection").classList.remove("hidden");
  }
}
