
//Variabler
let main = document.querySelector("main");
let contentClanHomepage = document.getElementById("content");
let cowInCompetition = document.getElementById("cowInCompetition");
let backButton = document.getElementById("backButton");
let h1ClanName = document.getElementById("clanName");
let tartanDiv = document.getElementById("tartan");
let crestDiv = document.getElementById("crest");
let clanHistory = document.getElementById("history");
let clanMembersDIV = document.getElementById("clanMembers");
let activeMembers = document.getElementById("activeMembers");
let notActiveMembers = document.getElementById("notActiveMembers");
let activeCow = document.getElementById("activeCows");
let notActiveCow = document.getElementById("notAcriveCows");
let clanInfo = document.getElementById("clanInfo");
let seasonSkills = document.getElementById("seasonSkills");

let closeButtonDiv = document.getElementById("closeButtonDiv");
let closeButton = document.getElementById("closeButton");
let buttonBack = document.getElementById("buttonBack");
let buttonForward = document.getElementById("buttonForward");
let choosenCow = null;
let currentSeason = 9;

let popupNotCompeting = document.getElementById("popupNotCompeting");

let selectedClan;


//BUTTONS clanes
let buttonMacThomas = document.getElementById("MT");
let buttonMacDowall = document.getElementById("MD");
let buttonMacQueen = document.getElementById("MQ");
let buttonMacLeod = document.getElementById("ML");
let buttonMacKinnon = document.getElementById("MK");

buttonMacThomas.addEventListener("click", function () {
    selectedClan = "MacThomas";
    showClanHomePage(selectedClan);
    fillInfobox();
    drawLineDiagram();
});

buttonMacDowall.addEventListener("click", function () {
    selectedClan = "MacDowall";
    showClanHomePage(selectedClan);
    fillInfobox();
    drawLineDiagram();
});

buttonMacQueen.addEventListener("click", function () {
    selectedClan = "MacQueen";
    showClanHomePage(selectedClan);
    fillInfobox();
    drawLineDiagram();
});

buttonMacLeod.addEventListener("click", function () {
    selectedClan = "MacLeod";
    showClanHomePage(selectedClan);
    fillInfobox();
    drawLineDiagram();
});

buttonMacKinnon.addEventListener("click", function () {
    selectedClan = "MacKinnon";
    showClanHomePage(selectedClan);
    fillInfobox();
    drawLineDiagram();
});


//BUTTONS on cows 
let s1 = document.getElementById("s1");
let s2 = document.getElementById("s2");
let s3 = document.getElementById("s3");
let s4 = document.getElementById("s4");
let s5 = document.getElementById("s5");
let s6 = document.getElementById("s6");
let s7 = document.getElementById("s7");
let s8 = document.getElementById("s8");
let s9 = document.getElementById("s9");

let seasonButtons = [s1, s2, s3, s4, s5, s6, s7, s8, s9];

function setActiveButton(buttonClicked) {
    // ta bort active från alla
    for (let button of seasonButtons) {
        button.classList.remove("buttonActive");
    }
    // lägg till på klickad knapp
    buttonClicked.classList.add("buttonActive");
};

s1.addEventListener("click", function () {
    setActiveButton(s1);
    currentSeason = 0;
    drawAllArcs(choosenCow, currentSeason);
});

s2.addEventListener("click", function () {
    setActiveButton(s2);
    currentSeason = 1;
    drawAllArcs(choosenCow, currentSeason);
});

s3.addEventListener("click", function () {
    setActiveButton(s3);
    currentSeason = 2;
    drawAllArcs(choosenCow, currentSeason);
});

s4.addEventListener("click", function () {
    setActiveButton(s4);
    currentSeason = 3;
    drawAllArcs(choosenCow, currentSeason);
});

s5.addEventListener("click", function () {
    setActiveButton(s5);
    currentSeason = 4;
    drawAllArcs(choosenCow, currentSeason);
});

s6.addEventListener("click", function () {
    setActiveButton(s6);
    currentSeason = 5;
    drawAllArcs(choosenCow, currentSeason);
});

s7.addEventListener("click", function () {
    setActiveButton(s7);
    currentSeason = 6;
    drawAllArcs(choosenCow, currentSeason);
});

s8.addEventListener("click", function () {
    setActiveButton(s8);
    currentSeason = 7;
    drawAllArcs(choosenCow, currentSeason);
});

s9.addEventListener("click", function () {
    setActiveButton(s9);
    currentSeason = 8;
    drawAllArcs(choosenCow, currentSeason);
});

closeButtonDiv.addEventListener("click", function () {
    popUpCowInfo.style.display = "none"
});


//FUNKTIONER

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
    cowInCompetition.style.display = "none";
    contentClanHomepage.style.display = "flex";
    crestDiv.innerHTML = "";
    tartanDiv.innerHTML = "";
    clanMembersDIV.innerHTML = "";
    allMembersPictures(clanName);

    for (let clan of clans) {
        if (clan.name === clanName) {
            h1ClanName.textContent = `Clan ${clan.name}`;

            let crestImg = document.createElement("img");
            crestImg.src = clan.crest;
            crestImg.classList.add("picCrestAndTartan");
            crestDiv.append(crestImg);

            let tartanImg = document.createElement("img");
            tartanImg.src = clan.tartan;
            tartanImg.classList.add("tartanPic");
            tartanImg.classList.add("picCrestAndTartan");
            tartanDiv.append(tartanImg);
        }
    };

    for (let clan of claninfo) {
        if (clan.name === clanName) {
            clanHistory.textContent = clan.info;
        }
    }
    let players = membersClan(clanName);
    return players;
};


//personlig info för varje ko, som ska synas på klansida
function allMembersPictures(clanName) {

    let allMembers = membersClan(clanName);

    for (let player of allMembers) {
        let imgDIV = document.createElement("div");
        imgDIV.classList.add("memberCard");
        imgDIV.style.textAlign = "center";

        let img = document.createElement("img");
        img.src = player.img;
        img.classList.add("cowMembers");
        let cowID = player.id;
        imgDIV.setAttribute("id", cowID);

        let cowName = document.createElement("p");
        cowName.style.fontSize = "18px";
        cowName.textContent = player.name;

        imgDIV.append(img);
        imgDIV.append(cowName);
        clanMembersDIV.append(imgDIV);

        imgDIV.addEventListener("click", function () {
            let player_id = Number(imgDIV.id);
            popUpCowInfo.style.display = "flex"
            setActiveButton(s9);
            currentSeason = 8;
            setClickedMember(imgDIV);
            personalInfo(player_id);
            drawAllArcs(player_id, currentSeason);
        });

        function setClickedMember(memberCard) {

            let allCowImages = document.querySelectorAll(".cowMembers");

            // Ta bort tidigare markering
            for (let img of allCowImages) {
                img.classList.remove("memberChoosen");
            }

            // Hitta bilden inuti det klickade kortet
            let clickedImage = memberCard.querySelector(".cowMembers");

            // Lägg till markering på bilden
            clickedImage.classList.add("memberChoosen");
        }
    };
};


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

    for (let i = 0; i < seasonButtons.length; i++) {
        let button = seasonButtons[i];
        let playerScores = calculatePlayerSkills(player_id, i);
        let totalPoints = 0;

        for (let skill in playerScores) {
            totalPoints = totalPoints + playerScores[skill];
        };

        if (totalPoints === 0) {
            button.classList.add("memberNotCompeteSeasonButton");
        }
        else {
            button.classList.remove("memberNotCompeteSeasonButton");
        };
    };
};



function clanPointsPerMonth(clan, year) {
    let thisYear = allSeasons.find(x => x.year === year);
    let members = membersClan(clan);
    let monthScores = {};
    let allScores = [];


    for (let competition of thisYear.competitionDays) {
        let month = competition.date.month;

        if (month < 2 || month > 7) {
            continue;
        };

        if (!monthScores[month]) {
            monthScores[month] = 0;
        };

        for (let event of competition.events) {
            // sortera resultaten
            let sortedScores = [...event.scores];

            sortedScores.sort((a, b) => b.score - a.score);

            let placement = 1;


            for (let score of sortedScores) {
                let player = members.find(x => x.id === score.participantId
                );

                if (player) {
                    let points = getPoints(placement);
                    monthScores[month] = monthScores[month] + points;
                };
                placement++;
            }
        }
    }

    let monthNames = { 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul" };

    for (let month in monthScores) {
        allScores.push({
            month: monthNames[month],
            points: monthScores[month]
        });
    }

    let total = 0;
    for (let points of allScores) {
        total = total + points.points;
    }
    // console.log(total)
    // console.log(allScores);
    return allScores;
};

function fillInfobox() {

    let infoText = clanPointsPerMonth(selectedClan, currentSeason);
    let contentInfobox = document.getElementById("contentInfobox");

    contentInfobox.innerHTML = "";

    for (let text of infoText) {
        let divInfo = document.createElement("div");
        divInfo.style.display = "flex";

        let pMonthDiv = document.createElement("div");
        pMonthDiv.style.width = "50%";
        let pMonth = document.createElement("p");
        pMonth.textContent = text.month;
        pMonthDiv.append(pMonth);

        let pPointsDiv = document.createElement("div");
        pPointsDiv.style.width = "50%";
        let pPoints = document.createElement("p");
        pPoints.textContent = text.points;
        pPointsDiv.append(pPoints);

        divInfo.append(pMonthDiv, pPointsDiv);
        contentInfobox.append(divInfo);
    }
}


function drawLineDiagram() {
    document.getElementById("svgElement").innerHTML = "";
    let points = clanPointsPerMonth(selectedClan, currentSeason);

    let months = points.map(x => x.month);
    let highestScore = 0;

    for (let score of points) {
        if (score.points > highestScore) {
            highestScore = score.points;
        }
    };

    let hSvg = 400;
    let wSvg = 900;
    let wPad = 50;
    let hPad = 50;

    let svg = d3.select("#svgElement")
        .append("svg")
        .attr("height", hSvg)
        .attr("width", wSvg)
        .style("border", "1px solid black")
        .style("background-color", "#719188")
        .style("color", "white")
        ;

    let xScale = d3.scaleBand()
        .domain(months)
        .range([wPad, wSvg - wPad])
        .paddingInner(1)
        .paddingOuter(0.3);

    let yScale = d3.scaleLinear()
        .domain([0, highestScore + 10])
        .range([hSvg - hPad, hPad]);

    let xAxel = d3.axisBottom(xScale);
    let yAxel = d3.axisLeft(yScale);

    let dMaker = d3.line()
        .x(d => xScale(d.month) + xScale.bandwidth() / 2)
        .y(d => yScale(d.points));

    svg.append("g")
        .call(xAxel)
        .attr("transform", `translate(0, ${hSvg - hPad})`);

    svg.append("g")
        .call(yAxel)
        .attr("transform", `translate(${wPad}, 0)`);


    svg.append("g")
        .selectAll("rect")
        .data([points])
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke", "white")
        .attr("d", dMaker)
        ;


    svg.append("g")
        .selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx", setX)
        .attr("cy", setY)
        .attr("r", 6)
        .attr("fill", "white");


    function setX(d) {
        let placement = xScale(d.month) + xScale.bandwidth() / 2;
        return placement;
    };

    function setY(d) {
        let placement = yScale(d.points);
        return placement;
    };
};

//Erics variant med arraymetoder

// function calculatePlayerSkills(player_id, year) {
//     let skillTotals = {
//         "Mental endurance": {
//             totalScore: 0,
//             participations: 0
//         },
//         "Lugn-capacity": {
//             totalScore: 0,
//             participations: 0
//         },
//         "Personal-hygien": {
//             totalScore: 0,
//             participations: 0
//         },
//         "Speed": {
//             totalScore: 0,
//             participations: 0
//         },
//         "Leg-strength": {
//             totalScore: 0,
//             participations: 0
//         }
//     };

//     let thisYear = allSeasons.find(function (season) {
//         let yearFound = season.year === year;
//         return yearFound;
//     });

//     let playerScores = thisYear.competitionDays.map(cd => {
//         const events = cd.events;
//         const event = events.find(e => e.scores.some(score => score.participantId == player_id));
//         const scoreObject = event.find(s => s.participantId == player_id);
//         return {
//             score: scoreObject.score,
//             disciplineId: event.disciplineId,
//         };
//     });

//     playerScores.forEach(score => {

//         let rightDiscipline = disciplines.find(function (d) {
//             return d.id === score.disciplineId;
//         });

//         skillTotals[rightDiscipline.name].totalScore += score.score;
//         skillTotals[rightDiscipline.name].participations++;
//     });

//     // =========================
//     // RÄKNA UT AVERAGE
//     // =========================
//     let averageSkills = {};
//     for (let skill in skillTotals) {

//         let total = skillTotals[skill].totalScore;

//         let participations = skillTotals[skill].participations;

//         if (participations > 0) {
//             averageSkills[skill] = Math.round(total / participations);
//         } else {
//             averageSkills[skill] = 0;
//         }
//     }
//     console.log(averageSkills)
//     return averageSkills;
// }

function calculatePlayerSkills(player_id, year) {

    let thisYear = allSeasons.find(function (season) {
        return season.year === year;
    });

    let skillTotals = {
        "Mental endurance": {
            totalScore: 0,
            participations: 0
        },
        "Lugn-capacity": {
            totalScore: 0,
            participations: 0
        },
        "Personal-hygien": {
            totalScore: 0,
            participations: 0
        },
        "Speed": {
            totalScore: 0,
            participations: 0
        },
        "Leg-strength": {
            totalScore: 0,
            participations: 0
        }
    };

    // LOOPA ALLA DAGAR
    for (let day of thisYear.competitionDays) {

        // LOOPA EVENTS
        for (let event of day.events) {

            // HITTA DISCIPLINE
            let rightDiscipline = disciplines.find(function (disc) {
                let foundDisc = disc.id === event.disciplineId;
                return foundDisc;
            });

            // LOOPA ALLA SCORES
            for (let score of event.scores) {

                // RÄTT SPELARE?
                if (score.participantId === player_id) {

                    // score.score = själva poängen
                    let rawScore = score.score;

                    // LOOPA ALLA SKILLS
                    for (let skill in rightDiscipline.skillFactors) {

                        // hur viktig skillen är
                        let factor = rightDiscipline.skillFactors[skill];

                        // multiplicera score med factor
                        let factorizedScore = rawScore * factor;

                        // lägg till total score
                        skillTotals[skill].totalScore += factorizedScore;

                        // öka antal deltaganden
                        skillTotals[skill].participations++;
                    }
                }
            }
        }
    }

    // =========================
    // RÄKNA UT AVERAGE
    // =========================
    let averageSkills = {};
    for (let skill in skillTotals) {

        let total = skillTotals[skill].totalScore;

        let participations = skillTotals[skill].participations;

        if (participations > 0) {
            averageSkills[skill] = Math.round(total / participations);
        } else {
            averageSkills[skill] = 0;
        }
    }
    console.log(averageSkills)
    return averageSkills;
}

calculatePlayerSkills(189, 1)

//score är hur bra man är på något, points visar bara hur många gånger man har vunnit 
//måste kolla hur många gånger varje spelare deltar i en gren, för om alla deltar samma amtal gånger så behöver jag inte 
//Skala om minsta värdet och högsta värdet till något som är lättare att arbeta med, t.ex. [10, 30]


function drawSkillArc(playerID, year, skillName, chartDiv) {

    let playerScores = calculatePlayerSkills(playerID, year);

    let totalSkills = 0;

    for (let skill in playerScores) {
        totalSkills = totalSkills + playerScores[skill];
    };

    // Om spelaren inte tävlat:
    if (totalSkills === 0) {
        let cowName = document.getElementById("cowName");

        for (let cow of allParticipants) {
            if (cow.id === playerID) {
                cowName.textContent = cow.name;
            }
        };
        popupNotCompeting.style.display = "block";
        return;
    } else {
        popupNotCompeting.style.display = "none";
    };

    // =========================================
    // HÄMTA SPECIFIK SKILL
    // =========================================

    // skillName skickas in som argument.
    //
    // Exempel:
    // "strength"
    //
    // Då hämtas:
    //
    // playerScores["strength"]

    let rawSkillValue = playerScores[skillName];

    // =========================================
    // HITTA HÖGSTA SKILL-VÄRDET
    // =========================================

    // Gauge charten ska visa ett värde mellan 0-100.
    //
    // För att kunna skala om värdena behöver vi först veta:
    //
    // vilket skill-värde som är högst.

    let highestSkillValue = -Infinity;
    let lowestSkillValue = Infinity;

    for (let skill in playerScores) {

        let value = playerScores[skill];

        if (value > highestSkillValue) {
            highestSkillValue = value;
        }

        if (value < lowestSkillValue) {
            lowestSkillValue = value;
        }
    }

    // =========================================
    // SKALA OM VÄRDET
    // =========================================

    // Här används d3.scaleLinear().
    //
    // Den används för att omvandla ett värde
    // från ett intervall till ett annat.
    //
    // Exempel:
    //
    // 0 - 250   --->   0 - 100

    let scaleSkill = d3.scaleLinear()
        // originalvärden
        .domain([lowestSkillValue, highestSkillValue])
        // nya värden
        .range([10, 50]);

    // Omvandla spelarens riktiga skillvärde
    // till ett procentvärde mellan 0-100

    let gaugeValue = scaleSkill(rawSkillValue);

    // Avrunda värdet
    gaugeValue = Math.round(gaugeValue);


    // =========================================
    // SÄKERHET
    // =========================================

    // Säkerställer att värdet aldrig går över 100
    // eller under 0.

    if (gaugeValue > 50) {
        gaugeValue = 50;
    }

    if (gaugeValue < 0) {
        gaugeValue = 0;
    }

    // =========================================
    // SKAPA SVG
    // =========================================

    let width = 160;
    let height = 150;

    let svg = d3.select(chartDiv)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // =========================================
    // CENTRERA CHARTEN
    // =========================================

    // Ett <g>-element fungerar som en grupp/container.
    //
    // translate() flyttar gruppen.
    //
    // width / 2:
    // flyttar till mitten på x-axeln
    //
    // height - 30:
    // flyttar ner gauge charten

    let g = svg.append("g")
        .attr(
            "transform",
            `translate(${width / 2}, ${height - 30})`
        );

    // =========================================
    // VINKLAR
    // =========================================

    // Gauge charten är en halvcirkel.
    //
    // -PI/2 = vänster sida
    // PI/2 = höger sida

    let startAngle = -Math.PI / 2;
    let endAngle = Math.PI / 2;

    // =========================================
    // SKALA OM 0-100 TILL VINKLAR
    // =========================================

    // Här omvandlas:
    //
    // 0-100
    //
    // till:
    //
    // vänster -> höger

    let angleScale = d3.scaleLinear()

        .domain([0, 50])
        .range([startAngle, endAngle]);

    // =========================================
    // BAKGRUNDSBÅGE
    // =========================================

    // d3.arc() används för att skapa bågar/cirklar.

    let backgroundArc = d3.arc()
        // inre radie
        .innerRadius(35)
        // yttre radie
        .outerRadius(55)
        // startvinkel
        .startAngle(startAngle)
        // slutvinkel
        .endAngle(endAngle);

    // Rita bakgrundsbågen

    g.append("path")
        .attr("d", backgroundArc)
        .attr("fill", "white");

    // =========================================
    // FÄRGSKALA
    // =========================================

    // d3.scaleQuantize()
    // delar upp värden i olika färggrupper.

    let colorScale = d3.scaleQuantize()
        .domain([10, 50])
        .range([
            "#E53935",
            "#FF9800",
            "#3498DB",
            "#4CAF50",
            "#ffd700"
        ]);

    // Hämta rätt färg för värdet
    let gaugeColor = colorScale(gaugeValue);

    // =========================================
    // FYLLD BÅGE
    // =========================================

    // Denna båge visar spelarens värde.

    let valueArc = d3.arc()
        .innerRadius(35)
        .outerRadius(55)
        // startar alltid längst till vänster
        .startAngle(startAngle)
        // slutvinkel beror på spelarens värde
        .endAngle(angleScale(gaugeValue));

    // Rita den fyllda bågen
    g.append("path")
        .attr("d", valueArc)
        .attr("fill", gaugeColor);

    // =========================================
    // TEXT I MITTEN
    // =========================================

    g.append("text")
        // visa värdet
        .text(gaugeValue)
        // centrera texten
        .attr("text-anchor", "middle")
        // flytta upp texten lite
        .attr("y", -10)
        .style("font-size", "24px")
        .style("font-weight", "bold");

    // =========================================
    // RUBRIK / SKILL-NAMN
    // =========================================

    svg.append("text")
        .text(skillName)
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold");
}




// //skapa och rita diagrammen för skills
function drawAllArcs(player_id, year) {

    document.getElementById("chartOne").innerHTML = "";
    document.getElementById("chartTwo").innerHTML = "";
    document.getElementById("chartThree").innerHTML = "";
    document.getElementById("chartFour").innerHTML = "";
    document.getElementById("chartFive").innerHTML = "";

    drawSkillArc(player_id, year, "Mental endurance", "#chartOne");
    drawSkillArc(player_id, year, "Lugn-capacity", "#chartTwo");
    drawSkillArc(player_id, year, "Personal-hygien", "#chartThree");
    drawSkillArc(player_id, year, "Speed", "#chartFour");
    drawSkillArc(player_id, year, "Leg-strength", "#chartFive");
};



// function testingDraw() {
//     const discipline = {
//         "id": 1,
//         "name": "The great Moo-of",
//         "skillFactors": {
//             "Mental endurance": 4,
//             "Lugn-capacity": 5,
//             "Personal-hygien": 2,
//             "Speed": 1,
//             "Leg-strength": 3
//         }
//     };


//     // -----------------------------
//     // GÖR OM TILL ARRAY
//     // -----------------------------

//     let skillData = Object.entries(discipline.skillFactors)
//         .map(([skill, value]) => ({
//             skill,
//             value
//         }));

//     console.log(skillData);


//     // -----------------------------
//     // SVG
//     // -----------------------------

//     let width = 700;
//     let height = 700;

//     let svg = d3.select("#chart2")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     // Flytta mitten till center
//     let chart = svg.append("g")
//         .attr("transform", `translate(${width / 2}, ${height / 2})`);


//     // -----------------------------
//     // SCALE FÖR VINKLAR
//     // -----------------------------

//     let angleScale = d3.scaleBand()
//         .domain(skillData.map(d => d.skill))
//         .range([0, Math.PI * 2]);


//     // -----------------------------
//     // SCALE FÖR STORLEK
//     // -----------------------------

//     let radiusScale = d3.scaleLinear()
//         .domain([0, 5])
//         .range([0, 220]);


//     // -----------------------------
//     // RITA CIRKLAR I BAKGRUNDEN
//     // -----------------------------

//     let levels = [1, 2, 3, 4, 5];

//     chart.selectAll(".background-circles")
//         .data(levels)
//         .enter()
//         .append("circle")
//         .attr("r", d => radiusScale(d))
//         .attr("fill", "none")
//         .attr("stroke", "white")
//         .attr("opacity", 0.3);


//     // -----------------------------
//     // RITA LINJER FRÅN MITTEN
//     // -----------------------------

//     chart.selectAll(".axis-lines")
//         .data(skillData)
//         .enter()
//         .append("line")
//         .attr("x1", 0)
//         .attr("y1", 0)

//         .attr("x2", d => {

//             let angle =
//                 angleScale(d.skill) +
//                 angleScale.bandwidth() / 2;

//             return Math.cos(angle - Math.PI / 2)
//                 * radiusScale(5);

//         })

//         .attr("y2", d => {

//             let angle =
//                 angleScale(d.skill) +
//                 angleScale.bandwidth() / 2;

//             return Math.sin(angle - Math.PI / 2)
//                 * radiusScale(5);

//         })

//         .attr("stroke", "white")
//         .attr("opacity", 0.5);


//     // -----------------------------
//     // LABELS
//     // -----------------------------

//     chart.selectAll(".labels")
//         .data(skillData)
//         .enter()
//         .append("text")

//         .text(d => d.skill)

//         .attr("x", d => {

//             let angle =
//                 angleScale(d.skill) +
//                 angleScale.bandwidth() / 2;

//             return Math.cos(angle - Math.PI / 2)
//                 * (radiusScale(5) + 40);

//         })

//         .attr("y", d => {

//             let angle =
//                 angleScale(d.skill) +
//                 angleScale.bandwidth() / 2;

//             return Math.sin(angle - Math.PI / 2)
//                 * (radiusScale(5) + 40);

//         })

//         .attr("text-anchor", "middle");


//     // -----------------------------
//     // SKAPA PUNKTER
//     // -----------------------------

//     let points = skillData.map(d => {

//         let angle =
//             angleScale(d.skill) +
//             angleScale.bandwidth() / 2;

//         let radius = radiusScale(d.value);

//         return {
//             x: Math.cos(angle - Math.PI / 2) * radius,
//             y: Math.sin(angle - Math.PI / 2) * radius
//         };

//     });

//     console.log(points);
//     // -----------------------------
//     // LINE GENERATOR
//     // -----------------------------

//     let lineGenerator = d3.line()
//         .x(d => d.x)
//         .y(d => d.y);


//     // -----------------------------
//     // RITA RADAR CHART
//     // -----------------------------

//     chart.append("path")
//         .datum(points)

//         .attr("d", lineGenerator(points) + "Z")

//         .attr("fill", "#d4a373")
//         .attr("stroke", "white")
//         .attr("stroke-width", 3)
//         .attr("opacity", 0.8);


//     // -----------------------------
//     // RITA PUNKTER
//     // -----------------------------

//     chart.selectAll(".points")
//         .data(points)
//         .enter()
//         .append("circle")

//         .attr("cx", d => d.x)
//         .attr("cy", d => d.y)

//         .attr("r", 7)
//         .attr("fill", "white");


//     // -----------------------------
//     // TITEL
//     // -----------------------------

//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", 40)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "28px")
//         .attr("fill", "white")
//         .text(discipline.name);
// }


//===========================//
//===== ANROP =====//
//===========================//
cowInCompetition.style.display = "block";
// testingDraw()