// --- 1. INITIALISERING OCH DATAPREPARERING ---
let currentEventID = 1;
let currentSeasonYear = 9;

//Event knappar
let event_1DOM = document.getElementById("event_1");
event_1DOM.addEventListener("click", function () {
    let event = {
        name: "Moo Off",
        id: 1,
        info: `
        <h3>The Great Moo-Off</h3>
        <p>The Great Moo-Off is the most iconic event in the entire Highland Championship circuit and is often considered the spiritual heart of the tournament season. Thousands of spectators gather every year to witness competitors attempt to produce the loudest, deepest and most emotionally powerful “MOO” ever heard in the Highlands.<br>The discipline began centuries ago when farmers competed across valleys to see whose cattle calls carried the furthest through the mountains. Over time, the tradition evolved into a fully organized championship event with judges, cheering crowds and surprisingly intense rivalries between clans.<br>Competitors are scored on:</p>
        <ul>
        <li>Volume</li>
        <li>Vocal depth</li>
        <li>Breath control</li>
        <li>Emotional delivery</li>
        <li>Audience reaction</li>
        </ul>
        <p>Some participants spend months training their lungs in cold mountain air to increase vocal endurance, while others focus on achieving the perfect resonance technique known as “The Thunder Moo”.<br>The event heavily rewards calmness and mental endurance. Contestants who panic, lose rhythm or crack their voice during the performance rarely recover their score.<br>Despite its ridiculous appearance, The Great Moo-Off is taken extremely seriously throughout the Highlands.</p>
        `
    }
    handleEventChange(event);
});
let event_2DOM = document.getElementById("event_2");
event_2DOM.addEventListener("click", function () {
    let event = {
        name: "Fluff Styling",
        id: 2,
        info: `
            <h3 class=”subtitle”>Fluff Styling</h3>
            <p>Fluff Styling is where fashion, patience and cow-management collide in one of the most visually spectacular events of the season. Participants are given several hours to wash, groom, braid and decorate Highland cows before presenting them on the ceremonial runway stage.<br>What outsiders mistake for a “cute beauty contest” is actually one of the most technically demanding disciplines in the championship. Competitors must work under pressure while handling unpredictable animals, changing weather conditions and extremely judgmental style critics.<br>Contestants are judged on:<br></p>
            <ul>
            <li>Fluff symmetry</li>
            <li>Coat cleanliness</li>
            <li>Horn decoration</li>
            <li>Creativity</li>
            <li>Overall presentation</li>
            </ul>
            <p>Each year introduces new styling trends across the Highlands. Some stylists prefer traditional braided wool decorations, while others experiment with flowers, ribbons, glitter oils and clan-inspired patterns.<br>Backstage tensions are legendary. Stylists race between grooming stations while cows stubbornly refuse to cooperate, occasionally escaping mid-preparation and causing complete chaos.<br>Winning Fluff Styling brings enormous prestige, especially among younger fans and fashion-focused clans.</p>
        `
    }
    handleEventChange(event);
});
let event_3DOM = document.getElementById("event_3");
event_3DOM.addEventListener("click", function () {
    let event = {
        name: "Mountain Race",
        id: 3,
        info: `
            <h3 class=”subtitle”>Mountain Race</h3>
            <p>The Mountain Race is the ultimate test of physical endurance and survival instincts. Competitors must navigate steep hills, muddy trails, river crossings and dangerous rocky terrain while racing against both opponents and the brutal Highland weather.<br>The course changes slightly every season depending on storms, landslides and mountain conditions, meaning no competitor can rely entirely on memory or preparation.<br>Success in the Mountain Race depends on:<br></p>
            <ul>
            <li>Explosive speed</li>
            <li>Leg strength</li>
            <li>Endurance</li>
            <li>Terrain awareness</li>
            <li>Mental resilience</li>
            </ul>
            <p>Racers often train at high altitudes for months before the championship begins. Some even carry weighted barrels uphill daily to prepare for the extreme conditions.<br>The most feared section of the course is known as “The Widow’s Descent”, a steep downhill slope responsible for countless slips, tumbles and dramatic finishes over the years.<br>Spectators love the event for its unpredictability. Even heavily favored competitors can lose everything with a single bad step in the mud.</p>

        `
    }
    handleEventChange(event);
});
let event_4DOM = document.getElementById("event_4");
event_4DOM.addEventListener("click", function () {
    let event = {
        name: "Whiskey Barrell Kicking",
        id: 4,
        info: `
            <h3 class=”subtitle”>Whiskey Kicking</h3>
            <p>Whiskey Kicking is one of the oldest surviving Highland traditions and easily the loudest event in the championship arena. Participants compete to launch an empty whiskey barrel as far as possible using only a single kick and perfect technique.<br>What began centuries ago as a drunken village challenge slowly evolved into a respected competitive discipline celebrated across the region.<br>The event rewards:<br></p>
            <ul>
            <li>Raw leg strength</li>
            <li>Balance</li>
            <li>Timing</li>
            <li>Explosive movement</li>
            <li>Technical precision</li>
            </ul>
            <p>Barrels are carefully standardized before every tournament to ensure fairness, although competitors constantly debate whether humidity, temperature or barrel wood quality affect performance.<br>The crowd especially enjoys failed attempts. Poor technique often sends barrels spinning sideways into fences, spectators or occasionally back toward the competitor themselves.<br>Legend says one famous champion launched a barrel completely across a river during the Season 3 finals, a record that still remains unbeaten.<br>Despite its chaotic reputation, Whiskey Kicking requires far more skill and coordination than most newcomers expect.</p>

        `
    }
    handleEventChange(event);
});
let event_5DOM = document.getElementById("event_5");
event_5DOM.addEventListener("click", function () {
    let event = {
        name: "Bagpipe Napping",
        id: 5,
        info: `
            <h3 class=”subtitle”>The Bagpipe Test</h3>
            <p>The Bagpipe Test is feared by nearly every competitor and respected by every champion. Unlike the physically demanding disciplines, this event is purely psychological.<br>Contestants must stand beside an aggressively loud live bagpipe performance for as long as possible while maintaining focus, posture and emotional control. Leaving the marked circle, covering the ears or visibly breaking composure results in immediate disqualification.<br>The discipline was originally created by Highland military trainers who believed that true mental strength could only be measured through prolonged exposure to unbearable noise.<br>Competitors are judged on:<br></p>
            <ul>
            <li>Concentration</li>
            <li>Emotional stability</li>
            <li>Stress resistance</li>
            <li>Calmness under pressure</li>
            <li>Facial control</li>
            </ul>
            <p>The challenge becomes increasingly difficult as musicians intentionally alter rhythm, volume and tempo to mentally exhaust participants. Advanced performers are trained specifically to disrupt concentration and provoke emotional reactions.<br>Many physically strong athletes fail within minutes, while quieter and more patient competitors often dominate through sheer mental resilience.<br>Veteran competitors claim that after surviving The Bagpipe Test, every other discipline in the tournament feels easy by comparison.</p>

        `
    }
    handleEventChange(event);
});


// Se till att 'main' är ett enskilt element för D3
let eventTitleDOM = document.getElementById("eventName");
const seasonRowDOM = document.getElementById("seasonRow");
const monthRow = document.getElementById("monthRow");
let monthChartDOM = document.getElementById("monthChart");
let eventInfoDOM = document.getElementById("event_info");


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

            // Ta bort active från alla säsongsknappar
            document.querySelectorAll("#seasonRow button")
                .forEach(button => {
                    button.classList.remove("active");
                });

            // Lägg active på klickad knapp
            seasonButtonDOM.classList.add("active");

            handleSeasonChange(season.year);


        });

        seasonRowDOM.append(seasonButtonDOM);
        if (season.year === currentSeasonYear) {
            seasonButtonDOM.classList.add("active");
        }
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

            // Ta bort active från alla månadsknappar
            document.querySelectorAll("#monthRow button")
                .forEach(button => {
                    button.classList.remove("active");
                });

            // Lägg active på klickad knapp
            monthButton.classList.add("active");

        });

    }
}

//KOLLA IGENOM!!
function getEventResultsByMonth(eventID, seasonYear, month) {

    let chosenSeason = allSeasons.find(season => {
        return season.year === seasonYear;
    });

    if (!chosenSeason) {
        return [];
    }

    let monthData = [];

    console.log(chosenSeason);
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

                points: getEventPoints(index + 1), //Kolla upp detta!!

                rawScore: scoreObject.score

            });
        }
    }
    return monthData;
}


// --- 4. D3 VISUALISERING --- SKRIV OM

let hSvg = 650, wSvg = 1200;
let wPad = 60, hPad = 60; // Lite mer utrymme för att slippa clipping

let monthChartSVG = d3.select("#monthChart").append("svg")
    .attr("height", hSvg)
    .attr("width", wSvg)
    .style("border", "1px solid grey")
    .style("background-color", "white")

//KOLLA IGENOM!!
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


    // Hämta min och max dag från datan
    //kolla upp extent 
    const [minDay, maxDay] = d3.extent(monthData, d => d.day);

    // 1. Skapa X-SKALA med lite extra utrymme (domain) på sidorna
    const xScale = d3.scaleLinear()
        .domain([minDay - 1, maxDay + 1]) // Drar av en dag i starten och lägger till en i slutet
        .range([wPad, wSvg - wPad]);

    // 2. Skapa Y-SKALA (Numerisk, 0 till 15)
    const yScale = d3.scaleLinear()
        .domain([-1, 15])
        // Vi drar av 8 pixlar (cirkelns radie) från bottenläget:
        .range([(hSvg - hPad) - 8, hPad]);


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
        .attr("fill", d => clanColors[d.clan])
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

function startPage() {

    let current_event = {
        name: "Moo Off",
        id: 1,
        info: `
            <h3 class=”subtitle”>The Great Moo-off</h3>
            <p>The Great Moo-Off is the most iconic event in the entire Highland Championship circuit and is often considered the spiritual heart of the tournament season. Thousands of spectators gather every year to witness competitors attempt to produce the loudest, deepest and most emotionally powerful “MOO” ever heard in the Highlands.<br>The discipline began centuries ago when farmers competed across valleys to see whose cattle calls carried the furthest through the mountains. Over time, the tradition evolved into a fully organized championship event with judges, cheering crowds and surprisingly intense rivalries between clans.<br>Competitors are scored on:<br></p>
            <ul>
            <li>Volume</li>
            <li>Vocal depth</li>
            <li>Breath control</li>
            <li>Emotional delivery</li>
            <li>Audience reaction</li>
            </ul>
            <p>Some participants spend months training their lungs in cold mountain air to increase vocal endurance, while others focus on achieving the perfect resonance technique known as “The Thunder Moo”.<br>The event heavily rewards calmness and mental endurance. Contestants who panic, lose rhythm or crack their voice during the performance rarely recover their score.<br>Despite its ridiculous appearance, The Great Moo-Off is taken extremely seriously throughout the Highlands.</p>
            `
    }
    //handleSeasonChange(9)
    handleEventChange(current_event)
    seasonButtons();
    // Hämtar alla månader för current season
    let currentMonths = createMonths(currentSeasonYear);

    // Hämtar sista månaden i arrayen
    let latestMonth =
        currentMonths[currentMonths.length - 1].month;

    // Hämtar datan för senaste månaden
    let startMonthData = getEventResultsByMonth(
        currentEventID,
        currentSeasonYear,
        latestMonth
    );
    let monthButtons =
        document.querySelectorAll("#monthRow button");

    // Sista knappen = senaste månaden
    monthButtons[monthButtons.length - 1]
        .classList.add("active");

    // Rita diagrammet direkt
    drawScatterPlot(startMonthData);
}
startPage();
