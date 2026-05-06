
//Variabler
let main = document.querySelector("main");
let contentClanHomepage = document.getElementById("content");
let allClansContent = document.createElement("div"); //För clansidan med alla claner

//Skapa header + knappar
createHeader();
let playerButton = document.getElementById("playerButton");
let bestPlayers = document.getElementById("bestPlayers");
let clanButton = document.getElementById("clanButton");
let schedualButton = document.getElementById("schedualButton");
let startButton = document.getElementById("startButton");


//AddEventLisneters
startButton.addEventListener("click", function () {
    main.innerHTML = "";
    drawClanMap();
});


playerButton.addEventListener("click", function () {
    main.innerHTML = "";
    getResultforPlayer(189, 0);
    playerPlacment(170, 0);
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




//Function

function drawClanMap() {

    main.innerHTML = "";

    let container = document.createElement("div");
    container.classList.add("bigDiv");
    main.append(container);

    let title = document.createElement("h2");
    title.textContent = "Clan origins";
    container.append(title);

    let width = 600;
    let height = 500;

    let svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //  KARTA SOM BAKGRUND
    svg.append("image")
        .attr("href", "../pic/Scotland.jpg")
        .attr("width", width)
        .attr("height", height);

    // 📍 POSITIONER (justera dessa så de passar kartan)
    let clanPositions = [
        { clan: "MacThomas", x: 300, y: 170 },
        { clan: "Macqueen", x: 360, y: 360 },
        { clan: "Macleod of the Lewes", x: 300, y: 390 },
        { clan: "Mackinnon", x: 350, y: 270 },
        { clan: "Mackenzie", x: 380, y: 200 }
    ];

    // 🎨 färger
    let colorScale = d3.scaleOrdinal()
        .domain(clanPositions.map(d => d.clan))
        .range(["#ff6b6b", "#4ecdc4", "#ffe66d", "#1a535c", "#ff9f1c"]);

    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "white")
        .style("padding", "6px")
        .style("border", "1px solid black")
        .style("border-radius", "5px")
        .style("display", "none")
        .style("pointer-events", "none");

    // 🔵 små punkter (valfria men snygga)
    svg.selectAll("circle")
        .data(clanPositions)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 6)
        .attr("fill", d => colorScale(d.clan))

        .on("mouseover", function (event, d) {
            tooltip.style("display", "block")
                .text(d.clan);

            d3.select(this)
                .attr("r", 10); // gör cirkeln större
        })

        .on("mousemove", function (event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY) + "px");
        })

        .on("mouseout", function () {
            tooltip.style("display", "none");

            d3.select(this)
                .attr("r", 6); // tillbaka till normal
        });

    // KLICKBAR TEXT
    let labels = svg.selectAll("g.label")
        .data(clanPositions)
        .enter()
        .append("g")
        .attr("class", "label")
        .attr("transform", function (d) {
            return `translate(${d.x + 10}, ${d.y})`;
        });
};


drawClanMap();







function threeYears(yearOne, yearTwo, yearThree) {

    function getParticipants(year) {
        let arr = [];
        let season = seasons.find(function (x) {
            return x.year === year;
        });

        for (let day of season.competitionDays) {
            for (let event of day.events) {
                for (let person of event.scores) {

                    if (!arr.includes(person.participantId)) {
                        arr.push(person.participantId);
                    }

                }
            }
        }

        return arr;
    }

    let y1 = getParticipants(yearOne);
    let y2 = getParticipants(yearTwo);
    let y3 = getParticipants(yearThree);

    let commonParticipants = [];

    for (let id of y1) {
        if (y2.includes(id) && y3.includes(id)) {
            commonParticipants.push(id);
        }
    }
    // console.log(commonParticipants);

    let notInCompetition = [];

    for (let person of participants) {
        if (!commonParticipants.includes(person.id)) {
            notInCompetition.push(person.id);
        }
    }

    return commonParticipants;
};

threeYears(0, 1, 2);





// console.log(allParticipants);


// let common = threeYears(0, 1, 2);

// // ids från allParticipants
// let allIds = allParticipants.map(p => p.id);

// // 🔍 jämför
// let missingInAll = common.filter(id => !allIds.includes(id));
// let extraInAll = allIds.filter(id => !common.includes(id));

// console.log("Saknas i allParticipants:", missingInAll);
// console.log("Extra i allParticipants:", extraInAll);