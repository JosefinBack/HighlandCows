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

    let clanDropDown = document.createElement("div");
    clanDropDown.style.display = "flex";
    clanDropDown.style.flexDirection = "column";

    let clanButton = document.createElement("button");
    clanButton.textContent = "Clans";

    let dropdownMeny = document.createElement("div");

    let dropDownMacThomas = document.createElement("div");
    let textMacThomas = document.createElement("a");
    textMacThomas.href = "../html/clanPage.html";
    textMacThomas.textContent = "MacThomas";
    dropDownMacThomas.append(textMacThomas);


    dropdownMeny.append(dropDownMacThomas);


    clanDropDown.append(clanButton, dropdownMeny);

    let schedualButton = document.createElement("button");
    schedualButton.textContent = "Schedual";

    startButton.id = "startButton";
    playerButton.id = "playerButton";
    bestPlayers.id = "bestPlayers";
    clanButton.id = "clanButton";
    schedualButton.id = "schedualButton";

    header.append(startButton, playerButton, bestPlayers, clanDropDown, schedualButton);
};

