let main = document.querySelector("main");



//göra en ny array av säsong 3 (dvs year = 2) för att få en halv säsong som vi kabn använda som vår akutella säsong



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

function playerInfo(player_id) {
    main.innerHTML = "";
    let playerID;
    let eventsArray = [];

    for (let player of participants) {
        if (player_id === player.id) {
            playerID = player.id;
        }
    }

    for (let game of seasons) {
        for (let playerPart of game.competitionDays) {
            for (let event of playerPart.events) {
                let scoreObj = event.scores.find(function (s) {
                    return s.participantId === playerID;
                });
                if (scoreObj) {
                    let obj = {
                        year: game.year,
                        day: playerPart.date,
                        locationId: playerPart.locationId,
                        event: event
                    };
                    eventsArray.push(obj);
                }
            }
        }
    }

    main.innerHTML = "";

    let thisDIV = document.createElement("div");
    thisDIV.classList.add("dayContainer");

    let playerPlacings = [];

    for (let item of eventsArray) {
        let gameDiv = document.createElement("div");
        gameDiv.classList.add("bigDiv");

        let title = document.createElement("div");
        title.textContent = `Discipline ${item.event.disciplineId}`;

        let info = document.createElement("div");
        info.textContent = `${item.day.day}/${item.day.month} - Year: ${item.year}`;

        gameDiv.append(title, info);

        let sortedScores = item.event.scores.slice().sort(function (a, b) {
            return b.score - a.score;
        });

        let i = 1;

        for (let score of sortedScores) {
            let row = document.createElement("div");
            row.textContent = `${i}. Player: ${score.participantId}, Score: ${score.score}`;

            // HÄR SPARAR VI DATA (DETTA ÄR DET VIKTIGA)
            if (score.participantId === playerID) {
                row.style.backgroundColor = "yellow";

                playerPlacings.push({
                    year: item.year,
                    discipline: item.event.disciplineId,
                    placement: i
                });
            }
            gameDiv.append(row);
            i++;
        }
        thisDIV.append(gameDiv);
    }
    main.append(thisDIV);
    let totalPoints = calculateTotalPoints(playerPlacings);

    console.log(totalPoints);
    console.log(playerPlacings);
};


function getBestPlayers(year) {
    let thisYear = seasons.find(x => x.year === year);


    console.log(thisYear);
};

getBestPlayers(0);

playerInfo(1);
