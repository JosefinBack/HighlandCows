// --- 1. INITIALISERING OCH DATAPREPARERING ---
let currentEventID = 1;
let currentSeasonYear = 9;


//Event knappar
let event_1DOM = document.getElementById("event_1").addEventListener("click", function () {
    let event = {
        name: "Moo Off",
        id: 1,
        info: "lorem"
    }
    handleEventChange(event);
});
let event_2DOM = document.getElementById("event_2").addEventListener("click", function () {
    let event = {
        name: "Fluff Styling",
        id: 2,
        info: "lorem"
    }
    handleEventChange(event);
});
let event_3DOM = document.getElementById("event_3").addEventListener("click", function () {
    let event = {
        name: "Mountain Race",
        id: 3,
        info: "lorem"
    }
    handleEventChange(event);
});
let event_4DOM = document.getElementById("event_4").addEventListener("click", function () {
    let event = {
        name: "Whiskey Barrell Kicking",
        id: 4,
        info: "lorem"
    }
    handleEventChange(event);
});
let event_5DOM = document.getElementById("event_5").addEventListener("click", function () {
    let event = {
        name: "Bagpipe Napping",
        id: 5,
        info:"lorem"
    }
    handleEventChange(event);
});


// Se till att 'main' är ett enskilt element för D3
const main = document.querySelector("main");
let eventTitleDOM = document.getElementById("eventName")
const dropBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("myDropdown");
// säsongsknappar
document.getElementById("event_currentSeason").addEventListener("click", () => handleSeasonChange(9));
document.getElementById("event_season9").addEventListener("click", () => handleSeasonChange(8));
document.getElementById("event_season8").addEventListener("click", () => handleSeasonChange(7));
document.getElementById("event_season7").addEventListener("click", () => handleSeasonChange(6));
document.getElementById("event_season6").addEventListener("click", () => handleSeasonChange(5));
document.getElementById("event_season5").addEventListener("click", () => handleSeasonChange(4));
document.getElementById("event_season4").addEventListener("click", () => handleSeasonChange(3));
document.getElementById("event_season3").addEventListener("click", () => handleSeasonChange(2));
document.getElementById("event_season2").addEventListener("click", () => handleSeasonChange(1));
document.getElementById("event_season1").addEventListener("click", () => handleSeasonChange(0));


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


function handleEventChange(event) {
    // Spara valt event
    currentEventID = event.id;

    // Reset text
    dropBtn.innerText = "Select Week";
    eventTitleDOM.innerHTML = `${event.name}`;

    // Uppdatera veckor
    updateWeekDropdown(currentSeasonYear);


}

function handleSeasonChange(seasonYear) {
    // Spara vald säsong
    currentSeasonYear = seasonYear;

    // Reset text
    dropBtn.innerText = "Select Week";

    // Uppdatera dropdown
    updateWeekDropdown(currentSeasonYear);;
}

function getEventResultsByWeek(eventID, seasonYear) {

    let chosenSeason = allSeasons.find(season => season.year === seasonYear);

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

                    if (!participant) {
                        console.log("Missing participant:", scoreObject.participantId);
                        continue;
                    }

                    if (!participant.clan) {
                        console.log("Participant missing clan:", participant);
                        continue;
                    }

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
    const results = getEventResultsByWeek(currentEventID, year);
    const totalWeeks = results.length > 0 ? results[results.length - 1].weekNumber : 0;

    for (let i = 1; i <= totalWeeks; i++) {
        let a = document.createElement("a");
        a.href = "#";
        a.textContent = `Week ${i}`;
        //Kolla igenom denna koden och förklara till 100% inför kodredovisning
        a.addEventListener("click", (e) => {
            e.preventDefault();
            dropBtn.textContent = `Week ${i}`;
            let selectedWeekData = results.filter(r => r.weekNumber === i);
            renderWeekBarCharts(selectedWeekData)
            dropdownMenu.classList.remove("show");
        });
        dropdownMenu.append(a);
    }
    // =========================
    // VISA SENASTE VECKAN DIREKT
    // =========================

    if (results.length > 0) {

        let latestWeek =
            results[results.length - 1].weekNumber;

        let latestWeekData =
            results.filter(result => {
                return result.weekNumber === latestWeek;
            });

        dropBtn.textContent =
            `Week ${latestWeek}`;

        renderWeekBarCharts(latestWeekData);
    }
}






// --- 4. D3 VISUALISERING --- SKRIV OM


let hSvg = 650, wSvg = 1200;
let threeDayChartSVG = d3.select("main").insert("svg", ":first-child")
    .attr("height", hSvg).attr("width", wSvg)
    .style("border", "1px solid grey")




function renderWeekBarCharts(weekData) {

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
    weekData.forEach((dayData, index) => {

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
handleSeasonChange(9)
handleEventChange(current_event)
