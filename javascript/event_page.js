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


function seasonButtons() {

    for (let season of allSeasons) {

        let seasonButtonDOM =
            document.createElement("button");

        seasonButtonDOM.classList.add("btn");

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

    currentEventID = event.id;

    eventTitleDOM.innerHTML = event.name;

    handleSeasonChange(currentSeasonYear);
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
    let monthArrayForSeason = createWeeks(year);
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


let hSvg = 650, wSvg = 1200;
let threeDayChartSVG = d3.select("main").insert("svg", ":first-child")
    .attr("height", hSvg).attr("width", wSvg)
    .style("border", "1px solid grey")



function drawScatterPlot(monthData) {
    
}


function renderWeekBarCharts(monthData) {

    // Rensa SVG
    threeDayChartSVG.selectAll("*").remove();

    // Storlek
    const margin = {
        top: 50,
        right: 30,
        bottom: 120,
        left: 60
    };

    const chartWidth = 350;
    const chartHeight = 500;

    // Färger för klaner
    const clanColors = {
        "MacThomas": "#3C4360",
        "MacDowall": "#6C82BC",
        "MacQueen": "#C80000",
        "MacLeod": "#C8C800",
        "MacKinnon": "#5D5B2C",
    };

    // Loopa varje dag
    monthData.forEach((dayData, index) => {

        // Grupp för dagens diagram
        const chartGroup = threeDayChartSVG.append("g")
            .attr(
                "transform",
                `translate(${index * 380 + 50}, 50)`
            );

        // =========================
        // SORTERA DELTAGARE
        // =========================

        let sortedParticipants = dayData.participants.slice().sort((a, b) => {
            return b.points - a.points;
        });

        // =========================
        // X SCALE
        // =========================

        const xScale = d3.scaleBand()
            .domain(
                sortedParticipants.map(player => player.participantName)
            )
            .range([0, chartWidth])
            .padding(0.2);

        // =========================
        // Y SCALE
        // =========================

        const yScale = d3.scaleLinear()
            .domain([0, 15])
            .range([chartHeight, 0]);

        // =========================
        // X AXEL
        // =========================

        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        // =========================
        // Y AXEL
        // =========================

        chartGroup.append("g")
            .call(
                d3.axisLeft(yScale)
                    .tickValues([0, 1, 3, 6, 10, 15])
            );

        // =========================
        // STAPLAR
        // =========================

        chartGroup.selectAll("rect")
            .data(sortedParticipants)
            .enter()
            .append("rect")

            // X position
            .attr("x", player => {
                return xScale(player.participantName);
            })

            // Y position
            .attr("y", player => {
                return yScale(player.points);
            })

            // Bredd
            .attr("width", xScale.bandwidth())

            // Höjd
            .attr("height", player => {
                return chartHeight - yScale(player.points);
            })

            // Färg
            .attr("fill", player => {
                return clanColors[player.clan];
            })

            // Outline
            .attr("stroke", "black");

        // =========================
        // TOOLTIP
        // =========================

        chartGroup.selectAll("rect")
            .append("title")
            .text(player => {
                return `
                        ${player.participantName}
                        Clan: ${player.clan}
                        Placement: ${player.placement}
                        Points: ${player.points}
                        Score: ${player.rawScore}
                `;
            });

        // =========================
        // TITEL
        // =========================

        chartGroup.append("text")
            .attr("x", chartWidth / 2)
            .attr("y", -20)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text(`Day ${dayData.day}/${dayData.month}`);
    });
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
    id: 1
}
//handleSeasonChange(9)
handleEventChange(current_event)
seasonButtons();