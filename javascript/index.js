let main = document.querySelector("main");
let header = document.getElementById("header");


//göra en ny array av säsong 3 (dvs year = 2) för att få en halv säsong som vi kabn använda som vår akutella säsong

//seasons 0, 1, 2
let threeSeasons = [];
for (let game of seasons) {
    if (game.year === 0 || game.year === 1 || game.year === 2) {
        threeSeasons.push(game);
    } else {
        continue;
    }
};


//participants 1-20 
let allParticipants = [];
for (let person of participants) {
    if (person.clan) {
        allParticipants.push(person)
    };
};

console.log(allParticipants);



//Buttons
let playerButton = document.createElement("Button");
playerButton.textContent = "Players";
let bestPlayers = document.createElement("Button");
bestPlayers.textContent = "Best playsers";
header.append(playerButton, bestPlayers);





//AddEventLisneters

playerButton.addEventListener("click", function () {
    main.innerHTML = "";
    getResultforPlayer(1, 0);
});

bestPlayers.addEventListener("click", function () {
    main.innerHTML = "";
    getBestPlayers(0);
    getBestPlayers(1);
    getBestPlayers(2);
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

function showPlayerInfo(player_id, year) {

    main.innerHTML = "";

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
        thisDIV.append(gameDiv);
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
    h2.textContent = "Playsers";
    main.append(h2);

    let resultDiv = document.createElement("div");
    let player = allParticipants.find(x => x.id === player_id);
    resultDiv.textContent = `Player ${player.name} from the clan ${player.clan} got ${result} point in season ${year + 1}`;

    main.append(resultDiv);

};

showPlayerInfo(1, 0);
