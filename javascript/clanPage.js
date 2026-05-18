

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

let closeButtonDiv = document.getElementById("closeButtonDiv");
let closeButton = document.getElementById("closeButton");
let buttonBack = document.getElementById("buttonBack");
let buttonForward = document.getElementById("buttonForward");
let choosenCow = null;
let currentSeason = 9;


let selectedClan = localStorage.getItem("selectedClan");

if (!selectedClan) {
    selectedClan = "MacThomas";
}


//BUTTONS
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

s1.addEventListener("click", function () {
    s1.classList.add("buttonActive");
    currentSeason = 0;
    drawAllArcs(choosenCow, currentSeason);
});

s2.addEventListener("click", function () {
    currentSeason = 1;
    drawAllArcs(choosenCow, currentSeason);
});

s3.addEventListener("click", function () {
    currentSeason = 2;
    drawAllArcs(choosenCow, currentSeason);
});

s4.addEventListener("click", function () {
    currentSeason = 3;
    drawAllArcs(choosenCow, currentSeason);
});

s5.addEventListener("click", function () {
    currentSeason = 4;
    drawAllArcs(choosenCow, currentSeason);
});

s6.addEventListener("click", function () {
    currentSeason = 5;
    drawAllArcs(choosenCow, currentSeason);
});

s7.addEventListener("click", function () {
    currentSeason = 6;
    drawAllArcs(choosenCow, currentSeason);
});

s8.addEventListener("click", function () {
    currentSeason = 7;
    drawAllArcs(choosenCow, currentSeason);
});

s9.addEventListener("click", function () {
    currentSeason = 8;
    drawAllArcs(choosenCow, currentSeason);
});

// buttonBack.addEventListener("click", function () {
//     if (currentSeason > 0) {
//         currentSeason--;
//         drawAllArcs(choosenCow, currentSeason);
//     }
// });

// buttonForward.addEventListener("click", function () {
//     if (currentSeason < 2) {
//         currentSeason++;
//         drawAllArcs(choosenCow, currentSeason);
//     }
// });

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
    crestDiv.innerHTML = "";
    tartanDiv.innerHTML = "";

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
function allMembersPictures() {

    let allMembers = showClanHomePage(selectedClan);

    for (let player of allMembers) {
        let imgDIV = document.createElement("div");
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
            personalInfo(player_id);
            drawAllArcs(player_id, currentSeason);
        });
    }
}


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
}





function drawLineDiagram() {

    let points = clanPointsPerMonth(selectedClan, currentSeason);
    console.log(points);

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

drawLineDiagram()

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





//FUNKTIONSANROP
allMembersPictures();
clanPointsPerMonth(selectedClan, currentSeason);




function calculatePlayerSkills(player_id, year) {

    // HÄMTA RÄTT SÄSONG
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

    // =========================
    // LOOPA IGENOM ALLA DAGAR
    // =========================

    for (let day of thisYear.competitionDays) {



        // =========================
        // LOOPA IGENOM ALLA EVENTS
        // =========================

        for (let event of day.events) {



            // =========================
            // SORTERA RESULTATEN
            // =========================

            let sortedScores = [...event.scores];

            sortedScores.sort(function (a, b) {
                return b.score - a.score;
            });



            // =========================
            // HITTA SPELARENS PLACERING
            // =========================

            for (let i = 0; i < sortedScores.length; i++) {
                // rätt spelare?
                if (sortedScores[i].participantId === player_id) {

                    // placering
                    let placement = i + 1;
                    //omvandla placering till poäng
                    let points = getPoints(placement);

                    //Hämta diciplinen
                    let discipline = disciplines.find(function (d) {
                        return d.id === event.disciplineId;
                    });

                    // LÄGG TILL SKILL-POÄNG
                    for (let skill in discipline.skillFactors) {

                        // hur viktig skillen är
                        let factor = discipline.skillFactors[skill];

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

    //Hämta spelaren skills
    let playerSkills = calculatePlayerSkills(playerID, year);

    //Hämta spevifik skill
    let rawSkillValue = playerSkills[skillName];

    let highestSkillValue = 0;

    // LOOPA IGENOM ALLA SKILLS
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