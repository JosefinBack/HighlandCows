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

    let clanDropDown = document.createElement("div");
    clanDropDown.classList.add("dropdown");

    let dropDownContent = document.createElement("div");
    dropDownContent.classList.add("dropdownContent");

    for (let clan of clans) {
        let clanDiv = document.createElement("div");
        clanDiv.textContent = clan.name;
        clanDiv.classList.add("clanOption");

        clanDiv.addEventListener("click", function () {
            localStorage.setItem("selectedClan", clan.name);
            window.location.href = "../html/clanPage.html";
        });
        dropDownContent.append(clanDiv);
    }
    clanDropDown.append(clanButton, dropDownContent);

    let schedualButton = document.createElement("button");
    schedualButton.textContent = "Schedual";

    startButton.id = "startButton";
    playerButton.id = "playerButton";
    bestPlayers.id = "bestPlayers";
    clanButton.id = "clanButton";
    schedualButton.id = "schedualButton";

    header.append(startButton, playerButton, bestPlayers, clanDropDown, schedualButton);
};

