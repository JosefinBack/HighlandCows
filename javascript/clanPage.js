
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
    drawLineDiagram();
});

buttonMacDowall.addEventListener("click", function () {
    selectedClan = "MacDowall";
    showClanHomePage(selectedClan);
    drawLineDiagram();
});

buttonMacQueen.addEventListener("click", function () {
    selectedClan = "MacQueen";
    showClanHomePage(selectedClan);
    drawLineDiagram();
});

buttonMacLeod.addEventListener("click", function () {
    selectedClan = "MacLeod";
    showClanHomePage(selectedClan);
    drawLineDiagram();
});

buttonMacKinnon.addEventListener("click", function () {
    selectedClan = "MacKinnon";
    showClanHomePage(selectedClan);
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

        function setClickedMember(clickedMember) {
            let allCowImages = document.querySelectorAll(".cowMembers");
            for (let img of allCowImages) {
                img.classList.remove("memberChoosen");
            }

            let clickedImage = clickedMember.querySelector(".cowMembers");
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
        let playerSkills = calculatePlayerSkills(player_id, i);
        let totalPoints = 0;

        for (let skill in playerSkills) {
            totalPoints = totalPoints + playerSkills[skill];
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
            let sortedScores = event.scores
                .slice()
                .sort((a, b) => b.score - a.score);

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
    let wPad = 100;
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
        .paddingOuter(0.3)
        ;

    let yScale = d3.scaleLinear()
        .domain([0, highestScore + 10])
        .range([hSvg - hPad, hPad])
        ;

    let xAxel = d3.axisBottom(xScale);
    let yAxel = d3.axisLeft(yScale);

    let dMaker = d3.line()
        .x(d => xScale(d.month) + xScale.bandwidth() / 2)
        .y(d => yScale(d.points))
        ;

    svg.append("g")
        .call(xAxel)
        .attr("transform", `translate(0, ${hSvg - hPad})`)
        ;

    svg.append("g")
        .call(yAxel)
        .attr("transform", `translate(${wPad}, 0)`)
        ;


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

    let hoverText = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "#FBE49F")
        .style("font-family", "Irish Grover")
        .style("padding", "6px")
        .style("border-radius", "5px")
        .style("display", "none")
        .style("pointer-events", "none")
        .style("border", "1px solid white")
        ;


    svg.append("g")
        .selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx", setX)
        .attr("cy", setY)
        .attr("r", 6)
        .attr("fill", "white")

        .on("mouseover", function (event, d) {
            hoverText
                .style("display", "block")
                .text(d.points + " points");
        })

        .on("mousemove", function (event, d) {
            hoverText
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px");
        })

        .on("mouseout", function (event) {
            hoverText
                .style("display", "none");
        })
        ;


    function setX(d) {
        let placement = xScale(d.month) + xScale.bandwidth() / 2;
        return placement;
    };

    function setY(d) {
        let placement = yScale(d.points);
        return placement;
    };


};


// function getMainSkill(disciplineID) {
//     let discipline = disciplines.find(d => d.id === disciplineID);
//     let highestSkill = "";
//     let highestValue = 0;

//     for (let skill in discipline.skillFactors) {
//         let value = discipline.skillFactors[skill];
//         if (value > highestValue) {
//             highestValue = value;
//             highestSkill = skill;
//         }
//     }
//     return highestSkill;
// };



function calculatePlayerSkills(player_id, year) {

    let thisYear = allSeasons.find(function (season) {
        return season.year === year;
    });

    // =========================
    // SPARAR ALLA SKILL-VÄRDEN
    // =========================

    let skillTotals = {
        "Mental endurance": 0,
        "Lugn-capacity": 0,
        "Personal-hygien": 0,
        "Speed": 0,
        "Leg-strength": 0
    };

    for (let day of thisYear.competitionDays) {
        for (let event of day.events) {

            let sortedScores = [...event.scores];

            sortedScores.sort(function (a, b) {
                return b.score - a.score;
            });

            for (let i = 0; i < sortedScores.length; i++) {
                // rätt spelare?
                if (sortedScores[i].participantId === player_id) {
                    // placering
                    let placement = i + 1;
                    //omvandla placering till poäng
                    let points = getPoints(placement);

                    //Hämta diciplinen
                    let rightDicipline = disciplines.find(function (d) {
                        return d.id === event.disciplineId;
                    });

                    // let rightDicipline = disciplines.find(x => x.id === disciplines.id);



                    // LÄGG TILL SKILL-POÄNG
                    for (let skill in rightDicipline.skillFactors) {

                        // hur viktig skillen är (får fram dess värde mellan 1 - 5)
                        let factor = rightDicipline.skillFactors[skill];

                        // poäng * faktor
                        let skillPoints = points * factor;

                        // lägg till på totalen
                        skillTotals[skill] = skillTotals[skill] + skillPoints;
                    }
                }
            }
        }
    }
    // console.log(skillTotals)
    return skillTotals;
}



function drawSkillArc(playerID, year, skillName, chartDiv) {

    let playerSkills = calculatePlayerSkills(playerID, year);
    console.log(playerSkills)

    let totalSkills = 0;
    for (let skill in playerSkills) {
        totalSkills = totalSkills + playerSkills[skill];
    };

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


    //Hämta specifik skillvärde från objektet i playserSkills
    let rawSkillValue = playerSkills[skillName];
    // console.log(rawSkillValue)

    let highestSkillValue = 0;

    // loopa igenom alla skills
    for (let skill in playerSkills) {
        let value = playerSkills[skill];

        if (value > highestSkillValue) {
            highestSkillValue = value;
        };
    };


    //Gör om värdet (skala om)
    let scaleSkill = d3.scaleLinear()
        .domain([0, highestSkillValue])
        .range([0, 100]);

    let gaugeValue = scaleSkill(rawSkillValue);

    gaugeValue = Math.round(gaugeValue);


    // säkerhet
    if (gaugeValue > 100) {
        gaugeValue = 100;
    }

    if (gaugeValue < 0) {
        gaugeValue = 0;
    }

    //SVG
    let width = 160;
    let height = 150;

    let svg = d3.select(chartDiv)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // centrera gauge
    let g = svg.append("g")
        .attr("transform",
            `translate(${width / 2}, ${height - 30})`
        );



    //vinklar
    let startAngle = -Math.PI / 2;
    let endAngle = Math.PI / 2;

    let angleScale = d3.scaleLinear()
        .domain([0, 100])
        .range([startAngle, endAngle]);

    //Bakgrund
    let backgroundArc = d3.arc()
        .innerRadius(35)
        .outerRadius(55)
        .startAngle(startAngle)
        .endAngle(endAngle);


    g.append("path")
        .attr("d", backgroundArc)
        .attr("fill", "white");

    // Färgskala
    let colorScale = d3.scaleQuantize()
        .domain([0, 100])
        .range([
            "#E53935",
            "#FF9800",
            "#3498DB",
            "#4CAF50",
            "#FFD700"
        ]);

    let gaugeColor = colorScale(gaugeValue);
    // =========================
    // FYLLD BÅGE
    // =========================

    let valueArc = d3.arc()
        .innerRadius(35)
        .outerRadius(55)
        .startAngle(startAngle)
        .endAngle(angleScale(gaugeValue));


    g.append("path")
        .attr("d", valueArc)
        .attr("fill", gaugeColor);

    // =========================
    // TEXT I MITTEN
    // =========================

    g.append("text")
        .text(gaugeValue + "%")
        .attr("text-anchor", "middle")
        .attr("y", -10)
        .style("font-size", "24px")
        .style("font-weight", "bold");



    // =========================
    // SKILL-NAMN
    // =========================

    svg.append("text")
        .text(skillName)
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold");

    // svg.append("text")
    //     .text("Skill factor: " + rawSkillValue)
    //     .attr("x", width / 2)
    //     .attr("y", height - 10)
    //     .attr("text-anchor", "middle")
    //     .style("font-size", "12px");
};




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