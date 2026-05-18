

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
let currentSeason = 2;


let selectedClan = localStorage.getItem("selectedClan");

if (!selectedClan) {
    selectedClan = "MacThomas";
}



//AddEventLisneters
// playerButton.addEventListener("click", function () {
//     main.innerHTML = "";
//     getResultforPlayer(189, 0);
//     playerPlacment(189, 0);
// });

// bestPlayers.addEventListener("click", function () {
//     main.innerHTML = "";
//     getBestPlayers(0);
//     getBestPlayers(1);
//     getBestPlayers(2);
// });

// clanButton.addEventListener("click", function () {
//     main.innerHTML = "";

//     main.classList.add("contentClanPage");
//     showClans();
// });


// schedualButton.addEventListener("click", function () {
//     main.innerHTML = "";
//     showWeeks();
// });

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
            drawAllArcs(player_id, 2);
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
    let thisYear = threeSeasons.find(x => x.year === year);
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




function playerPlacementInDiscipline(player_id, year, disciplineID) {

    let thisYear = threeSeasons.find(season => season.year === year);

    // spelarens placeringar
    let placements = [];

    // HÄMTA PLACERINGAR


    for (let day of thisYear.competitionDays) {

        for (let event of day.events) {

            // bara rätt disciplin
            if (event.disciplineId !== disciplineID) {
                continue;
            }

            // kopiera + sortera
            let sortedScores = [...event.scores];

            sortedScores.sort((a, b) => b.score - a.score);

            // hitta spelarens placering
            for (let i = 0; i < sortedScores.length; i++) {

                if (sortedScores[i].participantId === player_id) {
                    let placement = i + 1;
                    placements.push(placement);
                }
            }
        }
    }

    console.log(placements);

    // RÄKNA AVERAGE
    let total = 0;

    for (let placement of placements) {
        total += placement;
    }

    let averagePlacement = total / placements.length;

    averagePlacement = Number(averagePlacement.toFixed(2));

    // =========================
    // SKILL SCORE
    // =========================

    let skillScore = ((6 - averagePlacement) / 5) * 100;

    skillScore = Math.round(skillScore);

    let gaugeColor = "#E53935";

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

    return {
        discipline: disciplineID,
        placements: placements,
        averagePlacement: averagePlacement,
        skillScore: skillScore,
        gaugeColor: gaugeColor
    };
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
        .text(`Based on: ${disciplineName} `)
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


//skapa och rita diagrammen för skills
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



//FUNKTIONSANROP
allMembersPictures();
clanPointsPerMonth(selectedClan, currentSeason);

