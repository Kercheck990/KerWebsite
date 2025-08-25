// data.js
const users = [
  { username: "admin", password: "admin123", faction: "Grove" },
  { username: "grove_lead", password: "demo123", faction: "Grove" },
  { username: "ballas_lead", password: "demo123", faction: "Ballas" }
];

const leaders = {
  Grove: { name: "CJ", stats: "10 побед, 3 поражения" },
  Ballas: { name: "Big Smoke", stats: "8 побед, 5 поражений" }
};

const logs = {
  Grove: ["+1 новый член банды", "Сражение выиграно"],
  Ballas: ["-1 участник", "Конфликт с Grove"]
};
