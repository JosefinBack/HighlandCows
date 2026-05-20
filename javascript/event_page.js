// --- 1. INITIALISERING OCH DATAPREPARERING ---
let currentEventID = 1;
let currentSeasonYear = 9;

//Event knappar
let event_1DOM = document.getElementById("event_1");
event_1DOM.addEventListener("click", function () {
    let event = {
        name: "Moo Off",
        id: 1,
        info: "lorem"
    }
    handleEventChange(event);
});
let event_2DOM = document.getElementById("event_2");
event_2DOM.addEventListener("click", function () {
    let event = {
        name: "Fluff Styling",
        id: 2,
        info: "lorem"
    }
    handleEventChange(event);
});
let event_3DOM = document.getElementById("event_3");
event_3DOM.addEventListener("click", function () {
    let event = {
        name: "Mountain Race",
        id: 3,
        info: "lorem"
    }
    handleEventChange(event);
});
let event_4DOM = document.getElementById("event_4");
event_4DOM.addEventListener("click", function () {
    let event = {
        name: "Whiskey Barrell Kicking",
        id: 4,
        info: "lorem"
    }
    handleEventChange(event);
});
let event_5DOM = document.getElementById("event_5");
event_5DOM.addEventListener("click", function () {
    let event = {
        name: "Bagpipe Napping",
        id: 5,
        info: "lorem"
    }
    handleEventChange(event);
});


// Se till att 'main' är ett enskilt element för D3
const mainDOM = document.querySelector("main");
let eventTitleDOM = document.getElementById("eventName")
const seasonRowDOM = document.getElementById("seasonRow");
const monthRow = document.getElementById("monthRow");
let eventInfoDOM = document.getElementById("event_info");
let monthChartDOM = document.getElementById("monthChart");


function seasonButtons() {

    for (let season of allSeasons) {

        let seasonButtonDOM =
            document.createElement("button");

        if (season.year === 9) {

            seasonButtonDOM.innerHTML =
                "Current Season";

        } else {

            seasonButtonDOM.innerHTML =
                `Season ${season.year + 1}`;
        }

        seasonButtonDOM.addEventListener("click", () => {

            handleSeasonChange(season.year);

        });

        seasonRowDOM.append(seasonButtonDOM);
    }
}

function handleEventChange(event) {

    eventInfoDOM.innerHTML = ``;
    currentEventID = event.id;
    let eventInformation = event.info;

    eventTitleDOM.innerHTML = event.name;

    handleSeasonChange(currentSeasonYear);
    eventInfoDOM.innerHTML = `${eventInformation}`

}

function handleSeasonChange(seasonYear) {

    currentSeasonYear = seasonYear;

    monthRow.innerHTML = "";

    updateMonthButtons(
        currentEventID,
        currentSeasonYear
    );
}

function updateMonthButtons(eventID, year) {
    //const results = getEventResultsByMonth(currentEventID, year);
    let monthArrayForSeason = createMonths(year);
    console.log(monthArrayForSeason);
    const monthNames = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    for (let monthIndex of monthArrayForSeason) {
        if (monthNames[monthIndex.month] === "") {
            continue
        }
        let chosenMonth = monthIndex.month;
        let monthButton = document.createElement("button");
        monthButton.classList.add("monthButton");
        monthButton.textContent = monthNames[monthIndex.month];
        monthRow.append(monthButton);
        monthButton.addEventListener("click", function () {

            let monthData = getEventResultsByMonth(
                eventID,
                year,
                chosenMonth
            );

            drawScatterPlot(monthData);

        });

    }
}

function getEventResultsByMonth(eventID, seasonYear, month) {

    let chosenSeason = allSeasons.find(season => {
        return season.year === seasonYear;
    });

    if (!chosenSeason) {
        return [];
    }

    let monthData = [];

    // Loopa igenom alla tävlingsdagar
    for (let day of chosenSeason.competitionDays) {

        // Hoppa över dagar från andra månader
        if (day.date.month !== month) {
            continue;
        }

        // Hitta rätt event
        let specificEvent = day.events.find(event => {
            return event.disciplineId === eventID;
        });

        // Om eventet inte finns
        if (!specificEvent) {
            continue;
        }

        // Sortera score
        let sortedScores = specificEvent.scores
            .slice()
            .sort((a, b) => {
                return b.score - a.score;
            });

        // Loopa deltagare
        for (let index = 0; index < sortedScores.length; index++) {

            let scoreObject = sortedScores[index];

            let participant = allParticipants.find(player => {
                return player.id === scoreObject.participantId;
            });

            if (!participant) {
                continue;
            }

            monthData.push({

                participantName: participant.name,

                clan: participant.clan,

                day: day.date.day,

                month: day.date.month,

                placement: index + 1,

                points: getEventPoints(index + 1),

                rawScore: scoreObject.score

            });
        }
    }
    return monthData;
}


// --- 4. D3 VISUALISERING --- SKRIV OM

let hSvg = 650, wSvg = 1000;
let wPad = 60, hPad = 60; // Lite mer utrymme för att slippa clipping

let monthChartSVG = d3.select("#monthChart").append("svg")
    .attr("height", hSvg)
    .attr("width", wSvg)
    .style("border", "1px solid grey")
    .style("background-color", "white")


function drawScatterPlot(monthData) {

    // Om ingen data, rensa och avbryt
    if (!monthData || monthData.length === 0) {
        monthChartSVG.selectAll("*").remove();
        return;
    }

    monthChartSVG.selectAll("*").remove();

    // Hämtar månadsnumret för axelformateringen
    const currentMonthNum = monthData[0].month;

    const clanColors = {
        "MacThomas": "#3C4360",
        "MacDowall": "#6C82BC",
        "MacQueen": "#C80000",
        "MacLeod": "#C8C800",
        "MacKinnon": "#5D5B2C",
    };

    /*  // 1. Skapa X-SKALA (Numerisk, baserad på dagsnummer)
     // Vi använder d3.extent() för att automatiskt få [minDag, maxDag]
     const xScale = d3.scaleLinear()
         .domain(d3.extent(monthData, d => d.day))
         .range([wPad, wSvg - wPad]); // Definierar arbetsytan horisontellt */

    // Hämta min och max dag från datan
    const [minDay, maxDay] = d3.extent(monthData, d => d.day);

    // 1. Skapa X-SKALA med lite extra utrymme (domain) på sidorna
    const xScale = d3.scaleLinear()
        .domain([minDay - 1, maxDay + 1]) // Drar av en dag i starten och lägger till en i slutet
        .range([wPad, wSvg - wPad]);

    // 2. Skapa Y-SKALA (Numerisk, 0 till 15)
    const yScale = d3.scaleLinear()
        .domain([-1, 15])
        // Vi drar av 8 pixlar (cirkelns radie) från bottenläget:
        .range([(hSvg - hPad) - 5, hPad]);


    // 3. Rita X-axeln (Botten)
    monthChartSVG.append("g")
        .attr("transform", `translate(0, ${hSvg - hPad})`)
        .call(d3.axisBottom(xScale)
            // Tvinga D3 att bara sätta tick-märken på de dagar som faktiskt har data
            .tickValues(monthData.map(d => d.day))
            .tickFormat(d => `${d}/${currentMonthNum}`)
        );

    // 4. Rita Y-axeln (Vänster)
    // VIKTIGT: Vi flyttar gruppen med ${wPad} så att axeln och siffrorna ryms till vänster.
    monthChartSVG.append("g")
        .attr("transform", `translate(${wPad}, 0)`)
        .call(d3.axisLeft(yScale).tickValues([0, 1, 3, 6, 10, 15]));

    // 5. Rita cirklarna
    monthChartSVG.selectAll("circle")
        .data(monthData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.day))    // Korrekt mappning mot X-axeln
        .attr("cy", d => yScale(d.points)) // Korrekt mappning mot Y-axeln
        .attr("r", 8)
        .attr("fill", d => clanColors[d.clan] || "black")
        .attr("opacity", 0.8)
        .append("title")
        .text(d => `${d.participantName} (${d.clan}): ${d.points}p den ${d.day}/${d.month}`);
}



function getEventPoints(placement) {
    if (placement === 1) return 15;
    if (placement === 2) return 10;
    if (placement === 3) return 6;
    if (placement === 4) return 3;
    if (placement === 5) return 1;
    if (placement === 6) return 0;// Här ser vi till att 5:e plats ger poäng
}
let current_event = {
    name: "Moo Off",
    id: 1,
    info: "Moo-off"
}
//handleSeasonChange(9)
handleEventChange(current_event)
seasonButtons();