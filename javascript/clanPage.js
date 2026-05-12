
//Variabler
let main = document.querySelector("main");
let contentClanHomepage = document.getElementById("content");
let backButton = document.getElementById("backButton");
let h1ClanName = document.getElementById("clanName");
let tartanDiv = document.getElementById("tartan");
let crestDiv = document.getElementById("crest");
let clanHistory = document.getElementById("history");
let clanMembersDIV = document.getElementById("clanMembers");
let activeCow = document.getElementById("activeCows");
let notActiveCow = document.getElementById("notAcriveCows");
let clanInfo = document.getElementById("clanInfo");
let seasonSkills = document.getElementById("seasonSkills");

let buttonBack = document.getElementById("buttonBack");
let buttonForward = document.getElementById("buttonForward");
let choosenCow = null;
let currentSeason = 2;

createHeader();
let playerButton = document.getElementById("playerButton");
let bestPlayers = document.getElementById("bestPlayers");
let clanButton = document.getElementById("clanButton");
let schedualButton = document.getElementById("schedualButton");


//Clan history
let historyMacThomas = "Clan MacThomas is one of the oldest and proudest clans in the Highlands. Known for their strength, loyalty, and stubborn spirit, the clan settled in the hills of Glenshee many generations ago. Their cattle became famous for surviving harsh winters, defending their land, and competing fearlessly in the Highland Cow Tournament. Even today, the warriors of Clan MacThomas are respected for their endurance, courage, and unbreakable clan pride."


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

    main.classList.add("contentClanPage");
    showClans();
});


schedualButton.addEventListener("click", function () {
    main.innerHTML = "";
    showWeeks();
});

buttonBack.addEventListener("click", function () {
    if (currentSeason > 0) {
        currentSeason--;
        drawAllArcs(choosenCow, currentSeason);
    }
});

buttonForward.addEventListener("click", function () {
    if (currentSeason < 2) {
        currentSeason++;
        drawAllArcs(choosenCow, currentSeason);
    }
});

function membersClan(clanName) {
    let members = [];
    for (let person of allParticipants) {
        if (person.clan === clanName) {
            members.push(person)
        };
    };
    return members;
}

function showClanHomePage(clanName) {

    for (let clan of clans) {
        if (clan.name === clanName) {
            h1ClanName.textContent = clan.name;

            let crestImg = document.createElement("img");
            crestImg.src = clan.crest;
            crestImg.classList.add("picCrestAndTartan");
            crestDiv.append(crestImg);

            let tartanImg = document.createElement("img");
            tartanImg.src = clan.tartan;
            tartanImg.classList.add("picCrestAndTartan");
            tartanDiv.append(tartanImg);
        }
    };

    clanHistory.textContent = historyMacThomas;

    let players = membersClan(clanName);
    return players;
};


//personlig info för varje ko, som ska synas på klansida
function allMembersPictures() {
    let allMembers = showClanHomePage("MacThomas");

    for (let player of allMembers) {
        let imgDIV = document.createElement("div");

        let img = document.createElement("img");
        img.src = player.img;
        img.classList.add("cowMembers");
        let cowID = player.id;
        imgDIV.setAttribute("id", cowID);

        imgDIV.appendChild(img);
        clanMembersDIV.appendChild(imgDIV);

        imgDIV.addEventListener("click", function () {
            let player_id = Number(imgDIV.id);
            popUpCowInfo.style.display = "flex"
            personalInfo(player_id);
            drawAllArcs(player_id, 2);
        });
    }
}

allMembersPictures()

function personalInfo(player_id) {
    let popUpCowInfo = document.getElementById("popUpCowInfo");

    let infoDiv = document.getElementById("cowInfo");
    let infoPic = document.getElementById("picOnCow");
    infoDiv.innerHTML = "";
    infoPic.innerHTML = "";

    let rightCow = allParticipants.find(x => x.id === player_id);
    choosenCow = player_id;

    let cowName = rightCow.name;
    let cowClan = rightCow.clan;
    let cowAge = rightCow.age;
    let cowFurColor = rightCow.furcolor;

    let regionCow = clans.find(x => x.name === cowClan);
    let regionName = "";

    for (let region of locations) {
        if (region.id === regionCow.region) {
            regionName = region.name;
        }
    }

    let img = document.createElement("img");
    img.src = rightCow.img;
    img.classList.add("cowImg");

    let cownameP = document.createElement("p");
    cownameP.textContent = "Name: " + cowName;

    let cowAgeP = document.createElement("p");
    cowAgeP.textContent = "Age: " + cowAge;

    let cowFurColorP = document.createElement("p");
    cowFurColorP.textContent = "Fur color: " + cowFurColor;

    let cowregion = document.createElement("p");

    cowregion.textContent = "Region: " + regionName;

    infoDiv.append(cownameP, cowAgeP, cowFurColorP, cowregion);
    infoPic.append(img);
};



disciplineLeaderboard(0, 1, 170)

//ta fram poäng per gren
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




function getMainSkill(disciplineID) {

    let discipline = disciplines.find(d => d.id === disciplineID);
    let highestSkill = "";
    let highestValue = 0;

    for (let skill in discipline.skillFactors) {
        let value = discipline.skillFactors[skill];
        if (value > highestValue) {
            highestValue = value;
            highestSkill = skill;
        }
    }
    return highestSkill;
};




function playerPlacementInDiscipline(player_id, year, disciplineID) {

    let thisYear = threeSeasons.find(x => x.year === year);
    let allPlacings = [];

    // =========================
    // HÄMTA ALLA PLACERINGAR
    // =========================

    for (let day of thisYear.competitionDays) {
        for (let event of day.events) {
            if (event.disciplineId === disciplineID) {

                let copiedScores = [...event.scores];
                // högst score först
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
    // AVERAGE PLACEMENT
    // =========================

    let average = total / allPlacings.length;
    average = Number(average.toFixed(2));

    // =========================
    // SKILL SCORE (0–100)
    // =========================

    // 1st place = 100
    // 6th place = 0

    let skillScore =
        ((6 - average) / 5) * 100;

    skillScore = Math.round(skillScore);

    // säkerhet
    if (skillScore < 0) {
        skillScore = 0;
    }
    if (skillScore > 100) {
        skillScore = 100;
    }

    // =========================
    // LABEL + FÄRG
    // =========================

    let gaugeColor;

    if (skillScore >= 90) {
        gaugeColor = "#FFD700";
    }
    else if (skillScore >= 75) {
        gaugeColor = "#4CAF50";
    }
    else if (skillScore >= 55) {
        gaugeColor = "#3498DB";
    }
    else if (skillScore >= 35) {
        gaugeColor = "#FF9800";
    }
    else {
        gaugeColor = "#E53935";
    }

    // =========================
    // RESULTAT
    // =========================

    let result = {
        discipline: disciplineID,
        placings: allPlacings,
        averagePlacement: average,
        skillScore: skillScore,
        gaugeColor: gaugeColor
    };
    console.log(result);
    return result;
}


function drawArcs(playerID, year, disciplineID, chartDiv) {
    currentSeason = year;
    let h2Season = document.getElementById("h2Season");

    if (year === 0) {
        h2Season.textContent = "Season 1";
    }
    else if (year === 1) {
        h2Season.textContent = "Season 2";
    }
    else if (year === 2) {
        h2Season.textContent = "Current season";
    }

    let result = playerPlacementInDiscipline(
        playerID,
        year,
        disciplineID
    );

    let label = result.label;
    let value = result.skillScore;
    let originalValue = value;
    let gaugeColor = result.gaugeColor;

    let textValue;
    if (originalValue === null) {
        textValue = "-";
    }
    else {
        textValue = originalValue;
    }


    let rightDicipline = disciplines.find(x => result.discipline === x.id);

    let disciplineName = rightDicipline.name;
    let mainSkill = getMainSkill(disciplineID);

    //SVG
    const width = 160;
    const height = 150;

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
        .innerRadius(35)
        .outerRadius(55)
        .startAngle(startAngle)
        .endAngle(endAngle);

    g.append("path")
        .attr("d", backgroundArc)
        .attr("fill", "white");

    // =========================
    // FYLLD BÅGE
    // =========================

    const valueArc = d3.arc()
        .innerRadius(35)
        .outerRadius(55)
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
        .style("font-size", "24px")
        .style("font-weight", "bold");

    // =========================
    // DISCIPLIN-NAMN
    // =========================

    svg.append("text")
        .text(mainSkill)
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold");

    svg.append("text")
        .text(`Based on: ${disciplineName}`)
        .attr("x", width / 2)
        .attr("y", 50)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "black");

    svg.append("text")
        .text(`Average placement: ${result.averagePlacement} / 6`)
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .style("fill", "black");
};


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
};




