
//Variabler
let main = document.querySelector("main");
let contentClanHomepage = document.getElementById("content");
let allClansContent = document.createElement("div"); //För clansidan med alla claner

//Skapa header + knappar
createHeader();
let playerButton = document.getElementById("playerButton");
let bestPlayers = document.getElementById("bestPlayers");
let clanButton = document.getElementById("clanButton");
let schedualButton = document.getElementById("schedualButton");


//URL
let params = new URLSearchParams(window.location.search);
let page = params.get("page");

if (page === "clans") {
    clanButton.click(); // triggar befintlig kod
}


//AddEventLisneters
playerButton.addEventListener("click", function () {
    main.innerHTML = "";
    getResultforPlayer(189, 0);
    playerPlacment(189, 0);
});

bestPlayers.addEventListener("click", function () {
    main.innerHTML = "";
    getBestPlayers(0);
    getBestPlayers(1);
    getBestPlayers(2);
});

clanButton.addEventListener("click", function () {
    main.innerHTML = "";

    allClansContent.classList.add("contentClanPage");
    main.append(allClansContent);
    showClans();
});


schedualButton.addEventListener("click", function () {
    main.innerHTML = "";
    showWeeks();

});

