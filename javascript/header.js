let header = document.getElementById("header");

//Buttons
function createHeader() {

    let header = document.getElementById("header");

    let startButton = document.createElement("button");
    startButton.textContent = "Start";

    let playerButton = document.createElement("button");
    playerButton.textContent = "Players";

    let bestPlayers = document.createElement("button");
    bestPlayers.textContent = "Best players";

    let clanButton = document.createElement("button");
    clanButton.textContent = "Clans";

    let schedualButton = document.createElement("button");
    schedualButton.textContent = "Schedual";

    startButton.id = "startButton";
    playerButton.id = "playerButton";
    bestPlayers.id = "bestPlayers";
    clanButton.id = "clanButton";
    schedualButton.id = "schedualButton";

    header.append(startButton, playerButton, bestPlayers, clanButton, schedualButton);
};

