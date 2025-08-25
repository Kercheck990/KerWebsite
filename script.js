// Пример данных (можно заменить запросом к API Python-бота)
const leadersData = {
    grove: [
        { name: "Big Smoke", date: "25.08.2025" },
        { name: "CJ", date: "12.08.2025" }
    ],
    ballas: [
        { name: "Ryder", date: "20.08.2025" },
        { name: "Kane", date: "10.08.2025" }
    ]
};

function showFraction(fraction) {
    const container = document.getElementById("leaders-container");
    container.innerHTML = "";

    leadersData[fraction].forEach(leader => {
        const card = document.createElement("div");
        card.classList.add("leader-card");

        card.innerHTML = `
            <div class="leader-name">${leader.name}</div>
            <div class="leader-fraction">${fraction.toUpperCase()}</div>
            <div class="leader-date">Назначен: ${leader.date}</div>
        `;

        container.appendChild(card);
    });
}

// По умолчанию показываем Grove
showFraction("grove");
