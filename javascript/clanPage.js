
//Variabler
let main = document.querySelector("main");
let contentClanHomepage = document.getElementById("content");
let backButton = document.getElementById("backButton");


createHeader();
let playerButton = document.getElementById("playerButton");
let bestPlayers = document.getElementById("bestPlayers");
let clanButton = document.getElementById("clanButton");
let schedualButton = document.getElementById("schedualButton");



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

function membersClan(clanName) {
    let members = [];
    for (let person of participants) {
        if (person.clan === clanName) {
            members.push(person)
        };
    };
    // console.log(members)
    return members;
}

function showClanHomePage(clan) {
    let players = membersClan(clan);

    for (let player of players) {
        let div = document.createElement("div");
        div.classList.add("clanMember");

        let img = document.createElement("img");
        img.src = "../pic/cow.jpg";
        img.classList.add("cowImg");

        let name = document.createElement("p");
        name.textContent = player.name;

        div.append(img, name);
        contentClanHomepage.append(div);
    }
};








//Funktionsanrop
showClanHomePage(clanName);



