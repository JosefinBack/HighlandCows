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


// Skapa din sorterade och begränsade datakälla (Source of Truth)
/* let sortedThreeSeasons = seasons
    .filter(s => s.year >= 0 && s.year <= 2) // Ta bara de 3 första åren
    .map(season => {
        let sortedDays = [...season.competitionDays].sort((a, b) => {
            if (a.date.month !== b.date.month) return a.date.month - b.date.month;
            return a.date.day - b.date.day;
        });

        // Om säsong 2 ska vara en "halvsäsong" (första 8 dagarna i månaden)
        if (season.year === 2) {
            sortedDays = sortedDays.filter(d => d.date.day < 8);
        }

        return { ...season, competitionDays: sortedDays };
    });
 */
// --- 2. FUNKTIONER FÖR ATT HÄMTA DATA ---

function getEventResultsByWeek(eventID, seasonYear) {
    let chosenSeason = threeSeasons.find(s => s.year === seasonYear);
    if (!chosenSeason) return [];

    let allDays = chosenSeason.competitionDays;

    for (let i = 0; i < allDays.length; i += 3) {
        let currentWeekDays = allDays.slice(i, i + 3);
        let currentWeekNumber = (i / 3) + 1;

        currentWeekDays.forEach(week => {
            let specificEvent = week.events.find(ev => ev.disciplineId === eventID);
            if (specificEvent) {
                // Vi sorterar baserat på totalscoren för att se vem som ligger högst just nu
                // (Eftersom den som presterade bäst idag har ökat sin total mest inbördes)
                let rankedToday = [...specificEvent.scores].sort((a, b) => b.score - a.score);

                weekData.push({
                    weekNumber: currentWeekNumber,
                    day: week.date.day,
                    month: week.date.month,
                    scores: specificEvent.scores, // Rådatan
                    rankedScores: rankedToday    // Sorterad för poängutdelning
                });
            }
        });
    }
    return weekData;
}

let weekData = [];
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
    threeDayChartSVG.selectAll("*").remove(); // Rensa SVG

    const margin = { top: 50, right: 20, bottom: 80, left: 50 };
    const chartWidth = wSvg / 3;

    const yScale = d3.scaleLinear().domain([0, 15]).range([hSvg - margin.bottom, margin.top]);

    weekData.forEach((dayData, i) => {
        const chartG = threeDayChartSVG.append("g")
            .attr("transform", `translate(${i * chartWidth}, 0)`);

        // Mappa klaner till dagens prestation
        let clanResults = clanNames.map(clanName => {
            // 1. Hitta alla medlemmar i denna klan
            let clanMemberIds = allParticipants
                .filter(p => p.clan === clanName)
                .map(p => p.id);

            // 2. Hitta klanens placering i dagens ranking
            // Vi letar efter det första indexet i rankedScores som tillhör en klanmedlem
            let rankIndex = dayData.rankedScores.findIndex(s => clanMemberIds.includes(s.participantId));

            let points = 0;
            if (rankIndex !== -1) {
                // rankIndex 0 = 1:a plats, 1 = 2:a plats... 4 = 5:e plats
                let placement = rankIndex + 1;
                points = getEventPoints(placement);
            } else {
                // Om klanen mot förmodan inte deltog alls i just detta event
                points = 0;
            }

            return {
                clan: clanName,
                score: points
            };
        });
        console.log(clanResults);


        //console.log(clanResults);

        const xScale = d3.scaleBand()
            .domain(clanNames)
            .range([margin.left, chartWidth - 10])
            .padding(0.3);

        // Rita staplar
        chartG.selectAll(".bar")
            .data(clanResults).enter().append("rect")
            .attr("x", d => xScale(d.clan))
            .attr("y", d => yScale(d.score))
            .attr("width", xScale.bandwidth())
            .attr("height", d => (hSvg - margin.bottom) - yScale(d.score))
            .attr("fill", (d, idx) => ["#4a3728", "#8b5e3c", "#bc8f8f", "#d2b48c", "#deb887"][idx]);

        // Axlar
        chartG.append("g").attr("transform", `translate(0, ${hSvg - margin.bottom})`)
            .call(d3.axisBottom(xScale)).selectAll("text")
            .attr("transform", "rotate(-45)").style("text-anchor", "end");

        if (i === 0) {
            chartG.append("g").attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(yScale).ticks(5));
        }

        chartG.append("text")
            .attr("x", (chartWidth + margin.left) / 2).attr("y", margin.top / 2)
            .attr("text-anchor", "middle").style("font-weight", "bold")
            .text(`Day ${dayData.day}/${dayData.month}`);
    });
}

function getEventPoints(placement) {
    if (placement === 1) return 15;
    if (placement === 2) return 10;
    if (placement === 3) return 6;
    if (placement === 4) return 3;
    if (placement === 5) return 1; // Här ser vi till att 5:e plats ger poäng
}