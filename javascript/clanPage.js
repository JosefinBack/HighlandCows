
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

        let player_id = player.id;
        // disciplineLeaderboard(0, 1, player_id)

        div.append(img, name);
        // contentClanHomepage.append(div);
    }
};

showClanHomePage("MacThomas");



//personlig info för varje ko, som ska synas på klansida

function allMembersPictures() {
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
        let player_id = Number(imgDIV.id);
        personalInfo(player_id);
        drawAllArcs(player_id, 0);
    });
}

allMembersPictures()

let popUpCowInfo = document.getElementById("popUpCowInfo");

function personalInfo(player_id) {
    let rightCow = allParticipants.find(x => x.id === player_id);

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





// function disciplineLeaderboard(year, disciplineId, player_id) {
//     let thisYear = threeSeasons.find(x => x.year === year);
//     let totalPointsForOnePlayer = [];
//     let counter = 0;

//     for (let participant of allParticipants) {
//         let playerPoints = 0;

//         for (let day of thisYear.competitionDays) {
//             for (let event of day.events) {
//                 if (event.disciplineId === disciplineId) {
//                     // sortera resultaten
//                     let EventScoreArray = [...event.scores];
//                     EventScoreArray.sort((a, b) => b.score - a.score);

//                     let placement = 1;

//                     for (let score of EventScoreArray) {
//                         if (score.participantId === participant.id) {
//                             let points = getPoints(placement);
//                             playerPoints = playerPoints + points;
//                         }
//                         placement++;
//                     }
//                 }
//             }
//         }

//         totalPointsForOnePlayer.push({
//             id: participant.id,
//             name: participant.name,
//             total: playerPoints
//         });
//     }

//     // sortera efter totalpoäng
//     totalPointsForOnePlayer.sort((a, b) => b.total - a.total);

//     console.log(totalPointsForOnePlayer);

//     // VISA PÅ SIDAN
//     let bigDiv = document.createElement("div");
//     let test = document.getElementById("test");

//     let h2 = document.createElement("h2");
//     h2.textContent = `Discipline ${disciplineId}`;

//     bigDiv.append(h2);

//     let placement = 1;

//     for (let player of totalPointsForOnePlayer) {
//         if (player_id === player.id) {
//             let row = document.createElement("div");
//             row.textContent =
//                 `${placement}. ${player.name} | Total points: ${player.total}`;

//             bigDiv.append(row);

//         }
//         // placement++;
//     }

//     test.append(bigDiv);
//     console.log(counter)
// }

// disciplineLeaderboard(0, 1, 189)



function disciplineLeaderboard(year, disciplineId, player_id) {

    let thisYear = threeSeasons.find(x => x.year === year);

    let totalPointsForOnePlayer = [];

    // =========================
    // RÄKNA HUR MÅNGA GÅNGER
    // DISCIPLINEN SPELAS
    // =========================

    let counterTimes = 0;

    for (let day of thisYear.competitionDays) {

        for (let event of day.events) {

            if (event.disciplineId === disciplineId) {
                counterTimes++;
            }

        }
    }

    // maxpoäng
    let maxScore = counterTimes * 15;
    console.log(maxScore)

    for (let participant of allParticipants) {
        let playerPoints = 0;

        for (let day of thisYear.competitionDays) {
            for (let event of day.events) {
                if (event.disciplineId === disciplineId) {

                    // kopiera och sortera score-array
                    let EventScoreArray = [...event.scores];

                    EventScoreArray.sort((a, b) => b.score - a.score);

                    let placement = 1;

                    for (let score of EventScoreArray) {
                        if (score.participantId === participant.id) {
                            let points = getPoints(placement);
                            playerPoints = playerPoints + points;
                        }
                        placement++;
                    }
                }
            }
        }
        // procent av maxscore
        let percent = (playerPoints / maxScore) * 100;

        totalPointsForOnePlayer.push({
            id: participant.id,
            name: participant.name,
            total: playerPoints,
            percent: percent
        });
    }

    totalPointsForOnePlayer.sort((a, b) => b.total - a.total);

    let bigDiv = document.createElement("div");
    let test = document.getElementById("test");
    let h2 = document.createElement("h2");
    h2.textContent = `Discipline ${disciplineId}`;
    bigDiv.append(h2);

    let placement = 1;
    for (let player of totalPointsForOnePlayer) {
        if (player.id === player_id) {
            let row = document.createElement("div");
            row.textContent =
                `${placement}. ${player.name} | Total points: ${player.total} | ${Math.round(player.percent)}% of max`;
            bigDiv.append(row);
        }
        placement++;
    }
    test.append(bigDiv);
    console.log(counterTimes)
}
disciplineLeaderboard(0, 1, 170)




//hitta genomsnittlig placering inom varje gren
function playerPlacementInDiscipline(player_id, year, disciplineID) {
    let thisYear = seasons.find(function (season) {
        return season.year === year;
    });

    let allPlacings = [];
    for (let day of thisYear.competitionDays) {

        for (let event of day.events) {
            if (event.disciplineId === disciplineID) {

                let copiedScores = [...event.scores];
                //högst score först
                copiedScores.sort(function (a, b) {
                    return b.score - a.score;
                });

                for (let i = 0; i < copiedScores.length; i++) {

                    let score = copiedScores[i];
                    let placement = i + 1;

                    if (score.participantId === player_id) {
                        allPlacings.push(placement);
                    }
                }
            }
        }
    }
    // =========================
    // RÄKNA TOTAL
    // =========================

    let total = 0;

    for (let place of allPlacings) {
        total = total + place;
    }
    // =========================
    // RÄKNA AVERAGE
    // =========================

    if (allPlacings.length === 0) {

        let result = {
            discipline: disciplineID,
            placings: [],
            averagePlacement: null,
            skillScore: null,
            label: "Did not compete"
        };

        return result;
    }

    let average = total / allPlacings.length;
    average = Number(average.toFixed(2));


    let skillScore;
    if (average <= 1.5) {
        skillScore = 100;
    }
    else if (average <= 2) {
        skillScore = 85;
    }
    else if (average <= 3) {
        skillScore = 70;
    }
    else if (average <= 4) {
        skillScore = 50;
    }
    else if (average <= 5) {
        skillScore = 30;
    }
    else {
        skillScore = 15;
    }


    let label;
    if (skillScore >= 90) {
        label = "Elite";
    }
    else if (skillScore >= 75) {
        label = "Strong";
    }
    else if (skillScore >= 55) {
        label = "Average";
    }
    else if (skillScore >= 35) {
        label = "Weak";
    }
    else if (skillScore >= 15) {
        label = "Terrible";
    }
    else {
        label = "Did not compete"
    }
    // =========================
    // SLUTRESULTAT
    // =========================

    let result = {
        discipline: disciplineID,
        placings: allPlacings,
        averagePlacement: average,
        skillScore: skillScore,
        label: label
    };
    console.log(result);
    return result;
}
playerPlacementInDiscipline(170, 0)


function drawArcs(playerID, year, disciplineID, chartDiv) {

    let result = playerPlacementInDiscipline(
        playerID,
        year,
        disciplineID
    );

    let label = result.label;
    let value = result.skillScore;
    let originalValue = value;

    let textValue;
    if (originalValue === null) {
        textValue = "-";
    }
    else {
        textValue = originalValue;
    }


    let rightDicipline = disciplines.find(x => result.discipline === x.id);
    let disciplineName = rightDicipline.name;

    //SVG
    const width = 260;
    const height = 200;

    const svg = d3.select(chartDiv)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // centrera gauge
    const g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height - 30})`);
    // =========================
    // VINKLAR
    // =========================

    // halvcirkel
    const startAngle = -Math.PI / 2;
    const endAngle = Math.PI / 2;


    // konvertera 0–100 till vinkel
    const angleScale = d3.scaleLinear()
        .domain([0, 100])
        .range([startAngle, endAngle]);


    // =========================
    // BAKGRUNDSBÅGE
    // =========================

    const backgroundArc = d3.arc()
        .innerRadius(55)
        .outerRadius(75)
        .startAngle(startAngle)
        .endAngle(endAngle);

    g.append("path")
        .attr("d", backgroundArc)
        .attr("fill", "#dddddd");


    // =========================
    // FÄRG BASERAT PÅ LABEL
    // =========================

    let gaugeColor;

    if (label === "Elite") {
        gaugeColor = "#FFD700";
    }
    else if (label === "Strong") {
        gaugeColor = "#4CAF50";
    }
    else if (label === "Average") {
        gaugeColor = "#3498DB";
    }
    else if (label === "Weak") {
        gaugeColor = "#FF9800";
    }
    else if (label === "Terrible") {
        gaugeColor = "#E53935";
    }
    else {
        gaugeColor = "#9f9f9f";
    }

    // =========================
    // FYLLD BÅGE
    // =========================

    const valueArc = d3.arc()
        .innerRadius(55)
        .outerRadius(75)
        .startAngle(startAngle)
        .endAngle(angleScale(value));

    g.append("path")
        .attr("d", valueArc)
        .attr("fill", gaugeColor);


    // =========================
    // PROCENT I MITTEN
    // =========================

    g.append("text")
        .text(originalValue)
        .attr("text-anchor", "middle")
        .attr("y", -10)
        .style("font-size", "32px")
        .style("font-weight", "bold");


    // =========================
    // LABEL
    // =========================

    g.append("text")
        .text(label.toUpperCase())
        .attr("text-anchor", "middle")
        .attr("y", 20)
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", gaugeColor);


    // =========================
    // DISCIPLIN-NAMN
    // =========================

    svg.append("text")
        .text(disciplineName)
        .attr("x", width / 2)
        .attr("y", 70)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold");
}

function drawAllArcs(player_id, year) {

    document.getElementById("chartOne").innerHTML = "";
    document.getElementById("chartTwo").innerHTML = "";
    document.getElementById("chartThree").innerHTML = "";
    document.getElementById("chartFour").innerHTML = "";
    document.getElementById("chartFive").innerHTML = "";

    drawArcs(player_id, year, 1, "#chartOne");
    drawArcs(player_id, year, 2, "#chartTwo");
    drawArcs(player_id, year, 3, "#chartThree");
    drawArcs(player_id, year, 4, "#chartFour");
    drawArcs(player_id, year, 5, "#chartFive");
}
