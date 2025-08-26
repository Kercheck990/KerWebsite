(function () {
    const app = document.getElementById("app");
    const breadcrumbs = document.getElementById("breadcrumbs");
    const menuLinks = [...document.querySelectorAll(".menu-item")];

    // --- НАСТРОЙКИ ДЛЯ ПРИВЯЗКИ ТГ ---
    const GITHUB_REPO = 'Kercheck990/KerWebsite';
    const GITHUB_TOKEN = 'ТВОЙ_ТОКЕН_ЗДЕСЬ'; // !!! ВСТАВЬ СЮДА СВОЙ ТОКЕН !!!
    const PASSWORDS_FILE = 'passwords.json';

    // Тема
    const themeToggle = document.getElementById("themeToggle");
    const THEME_KEY = "arzfun:theme";
    const setTheme = (t) => {
        document.documentElement.dataset.theme = t;
        localStorage.setItem(THEME_KEY, t);
    };
    setTheme(localStorage.getItem(THEME_KEY) || "dark");
    themeToggle.addEventListener("click", () => {
        setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });

    // Хеш-роутер
    const routes = {
        "/": renderHome,
        "/orgs": renderOrgs,
        "/org/:id": renderOrg,
        "/profile/:nick": renderProfile,
        "/admin": renderStub("Администрация"),
        "/leaders": renderStub("Руководство"),
        "/ranks": renderStub("Ранги"),
        "/archive": renderStub("Архив руководителей"),
        "/inactives": renderStub("Одобрение неактивов"),
        "/random": renderStub("Случайные ситуации"),
        "/connect-telegram": renderConnectTelegram
    };

    function navigate() {
        const hash = location.hash.replace(/^#/, "") || "/";

        // Подсветка активного меню
        menuLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${hash}`));

        // Поиск подходящего маршрута
        const match = matchRoute(hash);
        if (!match) {
            renderNotFound();
            return;
        }
        breadcrumbs.textContent = match.breadcrumb;
        match.handler(...match.params);
    }

    function matchRoute(hash) {
        for (const [pattern, handler] of Object.entries(routes)) {
            const { regex, keys } = toRegex(pattern);
            const m = hash.match(regex);
            if (m) {
                const params = keys.map((_, i) => m[i + 1]);
                const breadcrumb = makeBreadcrumb(pattern, params);
                return { handler, params, breadcrumb };
            }
        }
        return null;
    }

    function toRegex(pattern) {
        const keys = [];
        const regex = new RegExp("^" + pattern.replace(/\//g, "\\/").replace(/:([A-Za-z0-9_]+)/g, (_, k) => {
            keys.push(k);
            return "([^\\/]+)";
        }) + "$");
        return { regex, keys };
    }

    function makeBreadcrumb(pattern, params) {
        if (pattern === "/") return "Главная";
        if (pattern === "/orgs") return "Фракции";
        if (pattern === "/org/:id") {
            const id = params[0];
            const org = DATA.orgs[id];
            return `Фракции / ${org ? org.name : id}`;
        }
        if (pattern === "/profile/:nick") return `Профиль / ${params[0]}`;
        const map = {
            "/admin": "Администрация",
            "/leaders": "Руководство",
            "/ranks": "Ранги",
            "/archive": "Архив руководителей",
            "/inactives": "Одобрение неактивов",
            "/random": "Случайные ситуации",
            "/connect-telegram": "Привязка Telegram"
        };
        return map[pattern] || "ArzFun Leaders";
    }

    function renderHome() {
        app.innerHTML = `
            <div class="grid cols-2">
                ${orgCard(DATA.orgs.grove)}
                ${orgCard(DATA.orgs.ballas)}
            </div>
        `;
    }

    function renderOrgs() {
        app.innerHTML = `
            <div class="grid cols-2">
                ${orgCard(DATA.orgs.grove, true)}
                ${orgCard(DATA.orgs.ballas, true)}
            </div>
        `;
    }

    function orgCard(org, withFooter=false) {
        const kpi = `
            <div class="kpi">
                <div class="k"><div class="v">${org.kpi.online6d}</div><div class="l">Онлайн за 6 дней</div></div>
                <div class="k"><div class="v">${org.kpi.kpd}</div><div class="l">КПД</div></div>
                <div class="k"><div class="v">${org.kpi.warnings}</div><div class="l">Предупреждения</div></div>
                <div class="k"><div class="v">${org.kpi.fired}</div><div class="l">Уволено за неделю</div></div>
            </div>
        `;
        const footer = withFooter ? `<div class="row" style="margin-top:10px;">
            <a class="btn" href="#/org/${org.key}">Открыть организацию</a>
            <a class="btn btn-ghost" href="#/profile/${org.leader}">Лидер: ${org.leader}</a>
        </div>` : "";
        return `
            <div class="card pad">
                <div class="row" style="align-items:center">
                    <div style="width:12px;height:12px;border-radius:50%;background:${org.color}"></div>
                    <h3 class="title" style="margin:0">${org.name}</h3>
                    <span class="badge" title="Сервер">${org.server}</span>
                </div>
                <div class="subtitle" style="margin:6px 0 14px">Краткая сводка по организации</div>
                ${kpi}
                ${footer}
            </div>
        `;
    }

    function renderOrg(id) {
        const org = DATA.orgs[id];
        if (!org) { renderNotFound(); return; }

        app.innerHTML = `
            <div class="card pad">
                <div class="row" style="align-items:center">
                    <div style="width:14px;height:14px;border-radius:50%;background:${org.color}"></div>
                    <h2 class="title" style="margin:0">${org.name}</h2>
                    <span class="badge">Сервер: ${org.server}</span>
                    <span class="badge success">Лидер: <a class="muted" style="text-decoration:none;margin-left:6px" href="#/profile/${org.leader}">${org.leader}</a></span>
                </div>

                <div class="grid cols-3" style="margin-top:14px">
                    <div class="card pad">
                        <div class="subtitle">Общая информация</div>
                        <div class="list">
                            <div class="row"><div class="col"><div class="muted">Онлайн за 6 дней</div><div class="title" style="font-size:18px">${org.kpi.online6d}</div></div>
                                   <div class="col"><div class="muted">КПД</div><div class="title" style="font-size:18px">${org.kpi.kpd}</div></div></div>
                            <div class="row"><div class="col"><div class="muted">Предупреждения</div><div class="title" style="font-size:18px">${org.kpi.warnings}</div></div>
                                   <div class="col"><div class="muted">Уволено за неделю</div><div class="title" style="font-size:18px">${org.kpi.fired}</div></div></div>
                        </div>
                    </div>

                    <div class="card pad">
                        <div class="subtitle">Статистика за неделю</div>
                        <div class="list">
                            <div><div class="muted">Повышено за неделю</div>
                                <div class="progress"><span style="width:${extractPercent(org.week.promoted)}%"></span></div>
                                <div class="muted" style="margin-top:6px">${org.week.promoted}</div>
                            </div>
                            <div style="margin-top:10px"><div class="muted">Онлайн за неделю</div>
                                <div class="muted">${org.week.online}</div>
                            </div>
                        </div>
                    </div>

                    <div class="card pad">
                        <div class="subtitle">Быстрые действия</div>
                        <div class="list">
                            <a class="btn" href="#/profile/${org.leader}">Открыть профиль лидера</a>
                            <a class="btn btn-ghost" href="#/orgs">К списку фракций</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid cols-2" style="margin-top:16px">
                <div class="card pad">
                    <div class="row" style="justify-content:space-between;align-items:center">
                        <h3 class="title" style="margin:0">Изменения руководителя</h3>
                        <div class="search">
                            <input type="search" id="logSearch" class="input" placeholder="Поиск изменений..." />
                        </div>
                    </div>
                    <div id="logs" class="list" style="margin-top:12px">
                        ${org.changes.map(c => logItem(c.at, c.text)).join("")}
                    </div>
                </div>

                <div class="card pad">
                    <h3 class="title" style="margin:0">Организация (${org.members.length})</h3>
                    <table class="table" style="margin-top:10px">
                        <thead><tr>
                            <th>Ник</th><th>Должность</th><th>Дней</th><th>Баллы</th><th>Онлайн</th><th>КПД</th><th>Пред</th>
                        </tr></thead>
                        <tbody>
                            ${org.members.map(m => `
                                <tr>
                                    <td><a href="#/profile/${m.nick}">${m.nick}</a></td>
                                    <td>${m.rank}</td>
                                    <td>${m.days}</td>
                                    <td>${m.points}</td>
                                    <td>${m.online}</td>
                                    <td>${m.kpd}</td>
                                    <td>${m.warnings}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Поиск по логам
        const input = document.getElementById("logSearch");
        const logs = document.getElementById("logs");
        input?.addEventListener("input", () => {
            const q = input.value.trim().toLowerCase();
            logs.innerHTML = org.changes
                .filter(c => c.text.toLowerCase().includes(q) || c.at.toLowerCase().includes(q))
                .map(c => logItem(c.at, c.text))
                .join("");
        });
    }

    function logItem(at, text) {
        return `<div class="card pad" style="padding:10px 12px;background:#12161d">
            <div class="muted" style="font-size:12px">${at}</div>
            <div style="margin-top:4px">${escapeHtml(text)}</div>
        </div>`;
    }

    function renderProfile(nick) {
        const user = DATA.users[nick] || findInMembers(nick);
        if (!user) { renderNotFound(); return; }

        app.innerHTML = `
            <div class="profile">
                <div class="left card pad">
                    <div class="flex">
                        <div class="avatar"></div>
                        <div>
                            <div class="name">${user.name}</div>
                            <div class="badge success">${user.role || "Пользователь"}</div>
                            <div class="muted" style="margin-top:6px">Сервер: ${user.server || "—"}</div>
                        </div>
                    </div>

                    <div class="card pad" style="margin-top:12px">
                        <div class="subtitle">Основная информация</div>
                        <div class="list" style="margin-top:8px">
                            <div class="li"><div class="dot"></div><div>Ник: <b>${user.name}</b></div></div>
                            <div class="li"><div class="dot"></div><div>Должность: <b>${user.rank || "—"}</b></div></div>
                            <div class="li"><div class="dot"></div><div>Создан: <b>${user.createdAt || "—"}</b></div></div>
                            <div class="li"><div class="dot"></div><div>Сервер: <b>${user.server || "—"}</b></div></div>
                            <div class="li"><div class="dot"></div><div>Дней в должности: <b>${user.days ?? "—"}</b></div></div>
                        </div>
                    </div>
                </div>

                <div class="right">
                    <div class="card pad">
                        <h3 class="title" style="margin:0">Последние действия</h3>
                        <div class="list" style="margin-top:10px">
                            ${(user.lastActions || []).map(a => `<div class="card pad" style="padding:8px 10px;background:#12161d">${escapeHtml(a)}</div>`).join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderStub(title) {
        return function () {
            app.innerHTML = `
                <div class="card pad">
                    <h2 class="title" style="margin:0">${title}</h2>
                    <p class="muted" style="margin-top:6px">Раздел-заглушка. Для GitHub Pages вся функциональность — на клиенте.</p>
                </div>
            `;
        }
    }

    function renderNotFound() {
        app.innerHTML = `
            <div class="card pad center">
                <h2 class="title">404 — ничего не найдено</h2>
                <p class="muted">Проверьте адрес или вернитесь на <a href="#/">главную</a>.</p>
            </div>
        `;
    }

    // --- Функции для привязки Telegram ---

    function renderConnectTelegram() {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('user_id');

        if (userId) {
            // Если в URL есть user_id, показываем форму для ввода кода
            app.innerHTML = `
                <div class="card pad center" style="max-width: 400px; margin: 0 auto;">
                    <h2 class="title">Привязка Telegram</h2>
                    <p class="muted" style="margin-top: 6px;">Введите код, который вам отправил бот.</p>
                    <div class="form" style="margin-top: 16px;">
                        <input type="text" id="code-input" class="input" placeholder="Ваш код">
                        <button id="verify-button" class="btn" style="width: 100%; margin-top: 10px;">Подтвердить</button>
                    </div>
                </div>
            `;
            const verifyButton = document.getElementById('verify-button');
            const codeInput = document.getElementById('code-input');

            if (verifyButton && codeInput) {
                verifyButton.addEventListener('click', async () => {
                    const userCode = codeInput.value;

                    if (!userCode) {
                        alert('Пожалуйста, введите код.');
                        return;
                    }

                    try {
                        const passwords = await getFileContent(PASSWORDS_FILE);
                        
                        if (passwords[userId] && passwords[userId] === userCode) {
                            // Код верный, удаляем его из объекта
                            delete passwords[userId];
                            await updateFile(PASSWORDS_FILE, passwords, `Привязка успешно завершена для ${userId}`);
                            alert('Привязка Telegram прошла успешно!');
                            // Перенаправляем пользователя на главную страницу или профиль
                            window.location.hash = '#/';
                        } else {
                            alert('Неверный код.');
                        }
                    } catch (error) {
                        console.error('Ошибка:', error);
                        alert('Произошла ошибка при привязке. Попробуйте еще раз.');
                    }
                });
            }
        } else {
            // Если user_id нет, показываем кнопку для перехода в бота
            app.innerHTML = `
                <div class="card pad center" style="max-width: 400px; margin: 0 auto;">
                    <h2 class="title">Привязка Telegram</h2>
                    <p class="muted" style="margin-top: 6px;">Нажмите на кнопку, чтобы получить уникальный код для привязки.</p>
                    <button id="link-telegram-btn" class="btn" style="width: 100%; margin-top: 16px;">
                        Привязать Telegram
                    </button>
                </div>
            `;
            const linkTelegramBtn = document.getElementById('link-telegram-btn');
            if (linkTelegramBtn) {
                linkTelegramBtn.addEventListener('click', () => {
                    const tempUserId = Math.random().toString(36).substring(2, 8);
                    const botUrl = `https://t.me/Kercheck990Bot?start=privyazka_${tempUserId}`;
                    window.location.href = botUrl;
                });
            }
        }
    }

    // --- Вспомогательные функции ---
    function extractPercent(s) {
        const m = String(s).match(/\((\d+)%\)/);
        return m ? +m[1] : 0;
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Инициализация
    window.addEventListener("hashchange", navigate);
    navigate();
})();
