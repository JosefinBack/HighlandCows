let main = document.querySelector("main");
let header = document.getElementById("header");


//Buttons
let playerButton = document.createElement("Button");
playerButton.textContent = "Players";

let bestPlayers = document.createElement("Button");
bestPlayers.textContent = "Best playsers";

let clanButton = document.createElement("Button");
clanButton.textContent = "Clans";

header.append(playerButton, bestPlayers, clanButton);



//göra en ny array av säsong 3 (dvs year = 2) för att få en halv säsong som vi kabn använda som vår akutella säsong


//Activ season
let threeSeasons = [];
for (let game of seasons) {
    if (game.year === 0 || game.year === 1) {
        threeSeasons.push(game);
    }

    if (game.year === 2) {
        let filteredDays = [];
        for (let competition of game.competitionDays) {
            if (competition.date.day < 8) {
                filteredDays.push(competition);
            }
        }
        let halfSeason = {
            year: game.year,
            coaches: game.coaches,
            trainers: game.trainers,
            competitionDays: filteredDays
        };
        threeSeasons.push(halfSeason);
    }
};

console.log(threeSeasons);


//participants 1-20 
let allParticipants = [];
for (let person of participants) {
    if (person.clan) {
        allParticipants.push(person)
    };
};

console.log(allParticipants);






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
    let players = membersClan("MacThomas");
    let clanDiv = document.createElement("div");
    clanDiv.classList.add("clanDiv")
    let h2 = document.createElement("h2");
    h2.textContent = "Clan MacThomas";
    clanDiv.append(h2);

    for (let player of players) {
        let div = document.createElement("div");
        div.classList.add("clanMember")

        let divPic = document.createElement("img");
        divPic.src = "../pic/cow.jpg";
        divPic.classList.add("cowImg")
        divPic.alt = "Player image";

        let divName = document.createElement("div");
        divName.textContent = `${player.name}`

        div.append(divPic);
        div.append(divName);
        clanDiv.append(div);
    }

    main.append(clanDiv);
});

//Functions

function getPoints(placement) {
    if (placement === 1) return 15;
    if (placement === 2) return 10;
    if (placement === 3) return 6;
    if (placement === 4) return 3;
    if (placement === 5) return 1;
    return 0;
}



function calculateTotalPoints(playerPlacings) {
    let total = 0;
    for (let p of playerPlacings) {
        total = total + getPoints(p.placement);
    }
    return total;
};



function calculatePlayerPoints(player_id, year) {
    let thisYear = threeSeasons.find(x => x.year === year);
    let playerID = player_id;
    let playerPlacings = [];

    for (let playerPart of thisYear.competitionDays) {
        for (let event of playerPart.events) {

            let sortedScores = event.scores.slice().sort((a, b) => b.score - a.score);

            let i = 1;

            for (let score of sortedScores) {
                if (score.participantId === playerID) {
                    playerPlacings.push({
                        year: thisYear.year,
                        discipline: event.disciplineId,
                        placement: i
                    });
                }
                i++;
            }
        }
    }

    return calculateTotalPoints(playerPlacings);
};

function playerPlacment(player_id, year) {
    let thisYear = threeSeasons.find(x => x.year === year);
    let playerID = player_id;
    let eventsArray = [];

    for (let playerPart of thisYear.competitionDays) {
        for (let event of playerPart.events) {
            let scoreObj = event.scores.find(s => s.participantId === playerID);

            if (scoreObj) {
                eventsArray.push({
                    year: thisYear.year,
                    day: playerPart.date,
                    locationId: playerPart.locationId,
                    event: event
                });
            }
        }
    }

    let thisDIV = document.createElement("div");
    thisDIV.classList.add("dayContainer");

    let h2 = document.createElement("h2");
    h2.textContent = `Player: ${player_id}`
    main.append(h2);

    for (let item of eventsArray) {
        let gameDiv = document.createElement("div");
        gameDiv.classList.add("bigDiv");

        let title = document.createElement("div");
        title.textContent = `Discipline ${item.event.disciplineId}`;

        let info = document.createElement("div");
        info.textContent = `${item.day.day}/${item.day.month} - Year: ${item.year}`;

        gameDiv.append(title, info);

        let sortedScores = item.event.scores.slice().sort((a, b) => b.score - a.score);

        let i = 1;

        for (let score of sortedScores) {
            let row = document.createElement("div");
            row.textContent = `${i}. Player: ${score.participantId}, Score: ${score.score}`;

            if (score.participantId === playerID) {
                row.style.backgroundColor = "yellow";
            }
            gameDiv.append(row);
            i++;
        }
        weekDiv.append(gameDiv)
        thisDIV.append(weekDiv);
    }
    main.append(thisDIV);
};


function getBestPlayers(year) {
    let resultArray = [];

    for (let person of allParticipants) {
        let playerID = person.id;
        let result = calculatePlayerPoints(playerID, year);

        resultArray.push({
            id: playerID,
            name: person.name,
            points: result
        });
    }

    resultArray.sort(function (a, b) {
        return b.points - a.points;
    });

    let placementDiv = document.createElement("div");
    placementDiv.classList.add("bigDiv");

    let title = document.createElement("h3");
    title.textContent = "Year " + year;
    placementDiv.append(title);

    for (let i = 0; i < 3; i++) {
        let player = resultArray[i];
        let divPlayer = document.createElement("div");
        divPlayer.textContent = `${player.name}, Total: ${player.points}`;

        placementDiv.append(divPlayer);
    }

    main.append(placementDiv);
    console.log(resultArray);
};

function getResultforPlayer(player_id, year) {
    let result = calculatePlayerPoints(player_id, year);

    let h2 = document.createElement("h2");
    h2.textContent = "Players";
    main.append(h2);

    let resultDiv = document.createElement("div");
    let player = allParticipants.find(x => x.id === player_id);
    resultDiv.textContent = `Player ${player.name} from the clan ${player.clan} got ${result} point in season ${year + 1}`;

    main.append(resultDiv);
};

function membersClan(clanName) {
    let members = [];
    for (let person of allParticipants) {
        if (person.clan === clanName) {
            members.push(person)
        };
    };
    console.log(members)
    return members;
}


