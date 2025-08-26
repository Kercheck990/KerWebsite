/* Статичные данные для GitHub Pages.
   Вы можете править всё здесь: названия, состав, логи, KPI.
*/

window.DATA = {
  orgs: {
    grove: {
      key: "grove",
      name: "Grove Street",
      color: "#42d66c",
      server: "Red-Rock [8]",
      leader: "Roy_Shelby",
      kpi: { online6d: "29:43:14", kpd: 0.62, warnings: "0/2", fired: "1/28 (3%)" },
      week: { promoted: "7/24 (29%)", online: "29:43:14/23:02:56" },
      changes: [
        { at: "27.04.2025 19:18:41", text: "ГС MIO Dexter_Campbell изменил дни срока на -4 по причине ошибка [Было: 96 | Стало: 92]" },
        { at: "27.04.2025 19:16:29", text: "ГС MIO Dexter_Campbell изменил дни срока на -6 по причине ошибка [Было: 102 | Стало: 96]" },
        { at: "27.04.2025 19:16:06", text: "ГС MIO Dexter_Campbell изменил дни срока на +6 по причине Неактив [Было: 96 | Стало: 102]" },
        { at: "25.04.2025 23:01:57", text: "Игрок Jeffy_Cosmo [Разработчик] изменил сервер пользователя [Было: Не установлен | Стало: Red-Rock [8]]" },
        { at: "25.04.2025 23:01:58", text: "Игрок Jeffy_Cosmo [Разработчик] изменил должность [Было: Игрок | Стало: ГА сервера]" }
      ],
      members: [
        { nick: "Roy_Shelby", rank: "Лидер", days: 73, points: 30, online: "29:43:14", kpd: 0.53, warnings: "0/2" },
        { nick: "Sean_Jones", rank: "Заместитель", days: 41, points: 18, online: "11:22:03", kpd: 0.47, warnings: "1/2" },
        { nick: "Carl_Johnson", rank: "Старший", days: 25, points: 12, online: "09:13:24", kpd: 0.61, warnings: "0/2" }
      ]
    },
    ballas: {
      key: "ballas",
      name: "Ballas Gang",
      color: "#a16eff",
      server: "Red-Rock [8]",
      leader: "Valentain_Vertucci",
      kpi: { online6d: "28:12:55", kpd: 0.58, warnings: "0/2", fired: "3/37 (8%)" },
      week: { promoted: "10/29 (34%)", online: "28:12:55/22:58:03" },
      changes: [
        { at: "26.04.2025 18:44:02", text: "Система повысила 10 сотрудников за неделю" },
        { at: "26.04.2025 14:09:33", text: "Обновлены ранги подразделений" },
        { at: "25.04.2025 23:02:16", text: "Перенос казны на новый счёт" }
      ],
      members: [
        { nick: "Valentain_Vertucci", rank: "Лидер", days: 92, points: 73, online: "29:43:14", kpd: 0.53, warnings: "0/2" },
        { nick: "Dexter_Campbell", rank: "Заместитель", days: 66, points: 40, online: "15:55:19", kpd: 0.49, warnings: "0/2" },
        { nick: "Ralph_Brooklyn", rank: "Старший", days: 34, points: 14, online: "07:21:05", kpd: 0.45, warnings: "1/2" }
      ]
    }
  },

  users: {
    "Roy_Shelby": {
      name: "Roy_Shelby",
      avatar: "", // положите ссылку на аву, если хотите
      role: "Главный Администратор",
      server: "Red-Rock [8]",
      createdAt: "25.04.2025 23:01:26",
      rank: "ГА сервера",
      days: 8,
      lastActions: [
        "Игрок Jeffy_Cosmo [Разработчик] изменил должность [Было: Игрок | Стало: ГА сервера]",
        "Игрок Jeffy_Cosmo [Разработчик] изменил сервер пользователя [Было: Не установлен | Стало: Red-Rock [8]]"
      ]
    },
    "Valentain_Vertucci": {
      name: "Valentain_Vertucci",
      avatar: "",
      role: "Лидер",
      server: "Red-Rock [8]",
      createdAt: "20.04.2025 11:07:03",
      rank: "Лидер Ballas",
      days: 73,
      lastActions: [
        "ГС MIO Dexter_Campbell изменил дни срока на -4 по причине ошибка [Было: 96 | Стало: 92]",
        "ГС MIO Dexter_Campbell изменил дни срока на -6 по причине ошибка [Было: 102 | Стало: 96]"
      ]
    }
  }
};
