// --- 1. INITIALISERING OCH DATAPREPARERING ---

// Se till att 'main' är ett enskilt element för D3
const main = document.querySelector("main");
const dropBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("myDropdown");


// --- FIX: Öppna/stäng menyn när man klickar på knappen ---
dropBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Hindrar klicket från att spridas
    dropdownMenu.classList.toggle("show");
});

// Stäng menyn om man klickar var som helst utanför den
window.addEventListener("click", function () {
    if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
    }
});


function getEventResultsByWeek(eventID, seasonYear) {

    let chosenSeason = threeSeasons.find(season => season.year === seasonYear);

    if (!chosenSeason) {
        return [];
    }

    let allDays = chosenSeason.competitionDays;

    let weekData = [];

    // Loopa igenom alla dagar
    for (let i = 0; i < allDays.length; i += 3) {

        // Skapa grupper om 3 dagar = en vecka
        let currentWeekDays = allDays.slice(i, i + 3);

        let currentWeekNumber = (i / 3) + 1;

        // Loopa igenom dagarna i veckan
        for (let day of currentWeekDays) {

            // Hitta rätt event
            let specificEvent = day.events.find(event => {
                return event.disciplineId === eventID;
            });

            // Om eventet finns
            if (specificEvent) {

                // Sortera deltagarna efter högst score
                let sortedScores = specificEvent.scores.slice().sort((a, b) => {
                    return b.score - a.score;
                });

                let participantsWithPoints = [];

                // Loopa deltagarna
                for (let index = 0; index < sortedScores.length; index++) {

                    let scoreObject = sortedScores[index];

                    let placement = index + 1;

                    let points = getEventPoints(placement);

                    // Hitta deltagaren
                    let participant = allParticipants.find(player => {
                        return player.id === scoreObject.participantId;
                    });

                    participantsWithPoints.push({
                        participantName: participant.name,
                        clan: participant.clan,
                        placement: placement,
                        points: points,
                        rawScore: scoreObject.score
                    });
                }

                // Spara dagens data
                weekData.push({
                    weekNumber: currentWeekNumber,
                    day: day.date.day,
                    month: day.date.month,
                    participants: participantsWithPoints
                });
            }
        }
    }

    return weekData;
}

// --- 3. UI-LOGIK OCH DROPDOWN ---

function updateWeekDropdown(year) {
    dropdownMenu.innerHTML = "";
    const results = getEventResultsByWeek(1, year); // Vi kollar event 1 som standard
    const totalWeeks = results.length > 0 ? results[results.length - 1].weekNumber : 0;

    for (let i = 1; i <= totalWeeks; i++) {
        let a = document.createElement("a");
        a.href = "#";
        a.textContent = `Week ${i}`;
        a.addEventListener("click", (e) => {
            e.preventDefault();
            dropBtn.textContent = `Week ${i}`;
            let selectedWeekData = results.filter(r => r.weekNumber === i);
            renderWeekCharts(selectedWeekData);
            dropdownMenu.classList.remove("show");
        });
        dropdownMenu.append(a);
    }
}

function handleSeasonChange(seasonYear) {
    dropBtn.innerText = "Select Week";
    updateWeekDropdown(seasonYear);
}

// Koppla säsongsknappar
document.getElementById("event_currentSeason").addEventListener("click", () => handleSeasonChange(2));
document.getElementById("event_season2").addEventListener("click", () => handleSeasonChange(1));
document.getElementById("event_season1").addEventListener("click", () => handleSeasonChange(0));





// --- 4. D3 VISUALISERING ---

let hSvg = 650, wSvg = 900;
let threeDayChartSVG = d3.select("main").append("svg")
    .attr("height", hSvg).attr("width", wSvg)
    .style("border", "1px solid grey");

function renderWeekCharts(weekData) {

    // Rensa svg
    threeDayChartSVG.selectAll("*").remove();

    // Margins
    const margin = {
        top: 50,
        right: 50,
        bottom: 100,
        left: 80
    };

    // Storlek på själva grafytan
    const innerWidth = wSvg - margin.left - margin.right;
    const innerHeight = hSvg - margin.top - margin.bottom;

    // Grupp för hela diagrammet
    const chartGroup = threeDayChartSVG.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);



    // =========================
    // X-AXEL
    // =========================

    // Skapa labels för dagarna
    let dayLabels = weekData.map(dayData => {
        return `${dayData.day}/${dayData.month}`;
    });

    // Scale för x
    const xScale = d3.scalePoint()
        .domain(dayLabels)
        .range([0, innerWidth]);



    // =========================
    // Y-AXEL
    // =========================

    const yScale = d3.scaleLinear()
        .domain([0, 15])
        .range([innerHeight, 0]);



    // =========================
    // RITA AXLAR
    // =========================

    // X-axel
    chartGroup.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale));

    // Y-axel
    chartGroup.append("g")
        .call(d3.axisLeft(yScale));



    // =========================
    // FÄRGER FÖR KLANER
    // =========================

    const clanColors = {
        "MacThomas": "#4a3728",
        "MacDowall": "#8b5e3c",
        "MacQueen": "#bc8f8f",
        "MacLeod": "#d2b48c",
        "MacKinnon": "#deb887",
        "MacLea": "#999999"
    };



    // =========================
    // SKAPA ALLA CIRKLAR
    // =========================

    // Loopa varje dag
    for (let dayData of weekData) {

        // Label för x-position
        let dayLabel = `${dayData.day}/${dayData.month}`;

        // Loopa deltagare
        for (let participant of dayData.participants) {

            chartGroup.append("circle")

                // X-position
                .attr("cx", xScale(dayLabel))

                // Y-position
                .attr("cy", yScale(participant.points))

                // Storlek
                .attr("r", 8)

                // Färg
                .attr("fill", clanColors[participant.clan])

                // Outline
                .attr("stroke", "black")

                // Tooltip
                .append("title")
                .text(
                    `${participant.participantName}
                    Clan: ${participant.clan}
                    Placement: ${participant.placement}
                    Points: ${participant.points}`
                );
        }
    }
}

function getEventPoints(placement) {
    if (placement === 1) return 15;
    if (placement === 2) return 10;
    if (placement === 3) return 6;
    if (placement === 4) return 3;
    if (placement === 5) return 1; // Här ser vi till att 5:e plats ger poäng
}