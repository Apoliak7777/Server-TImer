const apiUrl = 'http://localhost:3000/players';

async function fetchPlayers() {
    const response = await fetch(apiUrl);
    const players = await response.json();
    return players;
}

function calculateTimeLeft(expiryDate) {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const timeLeft = expiry - now;

    if (timeLeft <= 0) {
        return "Expired";
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
}

function renderPlayers(players) {
    const playersList = document.getElementById('players');
    playersList.innerHTML = '';

    players.forEach(player => {
        const li = document.createElement('li');
        const nameSpan = document.createElement('span');
        const timeSpan = document.createElement('span');

        nameSpan.textContent = `Name: ${player.name}`;
        timeSpan.textContent = `Time Left: ${calculateTimeLeft(player.expiry)}`;

        li.appendChild(nameSpan);
        li.appendChild(timeSpan);
        playersList.appendChild(li);
    });
}

async function updatePlayers() {
    const players = await fetchPlayers();
    renderPlayers(players);
}

setInterval(updatePlayers, 1000);
updatePlayers();
