
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



//personlig info för varje ko, som ska synas på klansida

let clanMembersDIV = document.getElementById("clanMembers");

let imgDIV = document.createElement("div");
let img = document.createElement("img");
img.src = "../cows/MacThomas/Alsdai_Campbell.png";
img.style.width = "200px";
img.style.height = "200px";
img.style.borderRadius = "50%";
img.style.border = "1px solid black";
imgDIV.setAttribute("id", 180);
imgDIV.appendChild(img);
clanMembersDIV.appendChild(imgDIV);

imgDIV.addEventListener("click", function () {
    personalInfo(Number(imgDIV.id));
});


let popUpCowInfo = document.getElementById("popUpCowInfo");

function personalInfo(number) {
    let rightCow = allParticipants.find(x => x.id === number);

    console.log(rightCow);

    let cowName = rightCow.name;
    let cowClan = rightCow.clan;
    let cowAge = rightCow.age;
    let cowFurColor = rightCow.furcolor;

    let regionCow = clans.find(x => x.name === cowClan);
    let home = regionCow.region

    let infoDiv = document.createElement("div");

    let cownameP = document.createElement("p");
    cownameP.textContent = "Name: " + cowName;

    let cowAgeP = document.createElement("p");
    cowAgeP.textContent = "Age: " + cowAge;

    let cowFurColorP = document.createElement("p");
    cowFurColorP.textContent = "Fur color: " + cowFurColor;

    let cowregion = document.createElement("p");
    cowregion.textContent = "Region: " + home;

    infoDiv.append(cownameP, cowAgeP, cowFurColorP, cowregion);
    popUpCowInfo.append(infoDiv);

};



//Funktionsanrop
// showClanHomePage(clanName);



