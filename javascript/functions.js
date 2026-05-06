
//Material

let clanNames = ["MacThomas", "Macdowall", "Macqueen", "Macleod", "Mackinnon"];

//Activ season (haft seasong 2(aka 3))
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

// console.log(threeSeasons);


//participants 1-37 
let allParticipants = [];
for (let person of participants) {
    if (person.clan) {
        allParticipants.push(person)
    };
};

console.log(allParticipants);


function showClans() {
    allClansContent.innerHTML = "";

    for (let clan of clanNames) {
        let clanDiv = document.createElement("div");
        clanDiv.classList.add("clanDiv");

        let h2 = document.createElement("h2");
        h2.classList.add("clickTitleClan")
        h2.textContent = clan;

        // h2.addEventListener("click", function () {
        //     let newPage =
        //         window.location.href = `clanPage.html?clan=${clan}`;
        // });

        clanDiv.append(h2);
        let players = membersClan(clan);

        for (let player of players) {
            let div = document.createElement("div");
            div.classList.add("clanMember");

            /*             let img = document.createElement("img");
                        img.src = "../pic/cow.jpg";
                        img.classList.add("cowImg"); */

            let name = document.createElement("p");
            name.textContent = player.name;

            div.append(name);
            clanDiv.append(div);
        }
        allClansContent.append(clanDiv);
    }
};


//Kan den kanske göras lite enklare? 
function showWeeks() {
    let h2 = document.createElement("h2");
    h2.textContent = "Competitionsdays";
    main.append(h2);

    let competitions = createWeeks(0);
    console.log(competitions);

    for (let monthObj of competitions) {
        for (let week of monthObj.weeks) {

            let weekDiv = document.createElement("div");
            weekDiv.classList.add("bigDiv");

            for (let competition of week) {

                let dayDiv = document.createElement("div");
                dayDiv.classList.add("dayRow");

                let dateDiv = document.createElement("div");

                // Datum
                let date = document.createElement("p");
                date.textContent = `Date: ${competition.date.day}/${competition.date.month}`;

                let locationP = document.createElement("p");
                let location = locations.find(d => d.id === competition.locationId);

                locationP.textContent = `Location: ${location.name}`;

                dateDiv.append(date, locationP);
                weekDiv.append(dateDiv);

                // LOOPA EVENTS
                for (let ev of competition.events) {

                    let eventDiv = document.createElement("div");
                    eventDiv.classList.add("eventDiv")

                    // Hämta namn på disciplin
                    let discipline = disciplines.find(d => d.id === ev.disciplineId);

                    let title = document.createElement("p");
                    title.textContent = discipline.name;
                    title.classList.add("titleEvent")

                    eventDiv.append(title);

                    let sortedScores = ev.scores.slice().sort(function (a, b) {
                        return b.score - a.score;
                    });

                    let i = 1;

                    for (let score of sortedScores) {
                        let player = participants.find(p => p.id === score.participantId);

                        let row = document.createElement("p");
                        row.classList.add("rowDiv");
                        row.textContent = `${i}. ${player.name} - ${score.score}`;

                        eventDiv.append(row);
                        i++;
                    }
                    dayDiv.append(eventDiv);
                }
                weekDiv.append(dayDiv);
            }
            main.append(weekDiv);
        }
    }
}


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


//ska vi ha denna???
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
console.log("hej")



function playerPlacment(player_id, year) {
    let thisYear = threeSeasons.find(x => x.year === year);

    let eventsArray = [];

    //  Samla alla events
    for (let playerPart of thisYear.competitionDays) {
        for (let event of playerPart.events) {

            eventsArray.push({
                year: thisYear.year,
                day: playerPart.date,
                locationId: playerPart.locationId,
                event: event
            });

        }
    }

    // Sortera events efter datum (viktigt!)
    eventsArray.sort((a, b) => {
        if (a.day.month === b.day.month) {
            return a.day.day - b.day.day;
        }
        return a.day.month - b.day.month;
    });

    let thisDIV = document.createElement("div");
    thisDIV.classList.add("dayContainer");

    let h2 = document.createElement("h2");
    h2.textContent = `Season ${year + 1}`;
    main.append(h2);

    let totalPointsPerPlayer = {};

    for (let item of eventsArray) {

        let gameDiv = document.createElement("div");
        gameDiv.classList.add("bigDiv");

        let title = document.createElement("div");
        title.textContent = `Discipline ${item.event.disciplineId}`;

        let info = document.createElement("div");
        info.textContent = `${item.day.day}/${item.day.month}`;

        gameDiv.append(title, info);

        // sortera resultat
        let sortedScores = item.event.scores.slice().sort((a, b) => b.score - a.score);

        let i = 1;

        for (let score of sortedScores) {

            let row = document.createElement("div");

            let points = getPoints(i);
            let id = score.participantId;

            let discipline = item.event.disciplineId;

            // skapa spelare
            if (!totalPointsPerPlayer[id]) {
                totalPointsPerPlayer[id] = {};
            }

            // skapa gren
            if (!totalPointsPerPlayer[id][discipline]) {
                totalPointsPerPlayer[id][discipline] = 0;
            }

            // lägg till poäng
            totalPointsPerPlayer[id][discipline] += points;

            let total = totalPointsPerPlayer[id][discipline];


            let player = allParticipants.find(p => p.id === id);

            row.textContent = `${i}. ${player.name} | Score: ${points} | Total (D${discipline}): ${total}`;

            // highlight vald spelare
            if (id === player_id) {
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
    // console.log(resultArray);
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
    // console.log(members)
    return members;
}


function createWeeks(year) {
    let thisYear = threeSeasons.find(x => x.year === year);
    let allMonths = [];

    for (let month = 2; month <= 11; month++) {
        let weekOne = [];
        let weekTwo = [];
        let weekThree = [];
        let weekFour = [];

        for (let competition of thisYear.competitionDays) {
            if (competition.date.month === month) {
                if (weekOne.length < 3) {
                    weekOne.push(competition);
                } else if (weekTwo.length < 3) {
                    weekTwo.push(competition);
                } else if (weekThree.length < 3) {
                    weekThree.push(competition);
                } else {
                    weekFour.push(competition);
                }
            }
        }
        let allWeeks = [weekOne, weekTwo, weekThree, weekFour];

        allMonths.push({
            month: month,
            weeks: allWeeks
        });
    }
    return allMonths;
};
