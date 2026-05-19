const startButton = document.getElementById("start-Button");
const seasonButton = document.getElementById("season-Button");
const eventButton = document.getElementById("event-Button");
const clansButton = document.getElementById("clans-Button");
const historyButton = document.getElementById("history-Button");
const main = document.querySelector("main");
const color = document.querySelector("color");
const pDiscipline = document.querySelector("p-discipline");
const top3PlayerWrapper = document.getElementById("top3Players");


function drawClanMap() {
  let mapData = getBestClan(9);

  let clanPositions = [
    { clan: "MacThomas", x: 300, y: 170 },
    { clan: "Macqueen", x: 360, y: 360 },
    { clan: "Macleod of the Lewes", x: 300, y: 390 },
    { clan: "Mackinnon", x: 350, y: 270 },
    { clan: "MacDonall", x: 380, y: 200 },
  ];

  let container = document.createElement("div");
  container.classList.add("bigDiv");
  main.append(container);

  let width = 600;
  let height = 500;

  let svg = d3
    .select("#svg-map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("image")
    .attr("href", "../pic/Scotland.jpg")
    .attr("width", width)
    .attr("height", height);

  let colorScale = d3
    .scaleOrdinal()
    .domain(clanPositions.map((d) => d.clan))
    .range(["#3C4360", "#C80000", "#C8C800", "#5D5B2C", "#6C82BC"]);

  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "clan-tooltip")
    .style("position", "absolute")
    .style("background", "#FBE49F")
    .style("font-family", "Irish Grover")
    .style("padding", "6px")
    .style("border-radius", "5px")
    .style("display", "none")
    .style("pointer-events", "none")
    .style("border", "1px solid white");

  svg
    .selectAll("circle")
    .data(clanPositions)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 8)
    .style("stroke", "white")
    .attr("fill", (d) => colorScale(d.clan))

    .on("mouseover", function (event, d) {
      tooltip.style("display", "block").html("");
   

      tooltip
        .append("strong")
        .style("display", "block")
        .style("text-align", "center")
        .text(d.clan);

      const allMapData = getBestClan(9);
      const specificClanData = allMapData.find((item) => item.clan === d.clan);

      if (specificClanData) {
        // 4. Rita pajen först
        displayPie(tooltip, specificClanData);

        // 5. Anropa din resultatfunktion direkt under
        displayResults(tooltip, specificClanData);

        drawTop3PlayersScatterPlot(tooltip, d.clan, 2);
      }

      d3.select(event.currentTarget).transition().attr("r", 12);
    })
    .on("mousemove", function (event) {
      tooltip
        .style("left", event.pageX + 15 + "px")
        .style("top", event.pageY - 50 + "px");
    })
    .on("mouseout", function (event) {
      tooltip.style("display", "none");
      d3.select(event.currentTarget).transition().attr("r", 8);
    });

  let labels = svg
    .selectAll("g.label")
    .data(clanPositions)
    .enter()
    .append("g")
    .attr("class", "label")
    .attr("transform", function (d) {
      return `translate(${d.x + 10}, ${d.y})`;
    });
}

function drawTop3PlayersScatterPlot(tooltipContainer, clanName, year) {
  // 1. Hämta ALLA spelare med deras poäng (helt utan att röra din originalfunktion!)
  const allPlayersWithPoints = getBestPlayers(year);

  // 2. Sortera ut topp 3 för just den klan vi hovrar på
  const top3InClan = [];
  
  for (let player of allPlayersWithPoints) {
    // Hitta spelaren i allParticipants för att kontrollera klanen
    const participant = allParticipants.find(p => p.id === player.id);
    
    if (participant && participant.clan.toLowerCase() === clanName.toLowerCase()) {
      top3InClan.push({
        name: player.name,
        points: player.points
      });
    }
    
    // Vi vill bara ha de 3 bästa (och getBestPlayers är redan färdigsorterad!)
    if (top3InClan.length === 3) {
      break;
    }
  }

  if (top3InClan.length === 0) return;

  // 3. Skapa en behållare inuti tooltipen för din scatterplot
  const scatterWrapper = tooltipContainer
    .append("div")
    .style("margin-top", "15px")
    .style("border-top", "1px solid white")
    .style("padding-top", "10px");

  scatterWrapper.append("span")
    .style("display", "block")
    .style("font-size", "12px")
    .style("margin-bottom", "8px")
    .text("Top 3 Players");

  // 4. Dimensioner (Kompakt för att få plats i din tooltip ruta)
  const margin = { top: 15, right: 25, bottom: 25, left: 35 };
  const width = 200 - margin.left - margin.right;
  const height = 120 - margin.top - margin.bottom;

  // Skapa SVG
  const svg = scatterWrapper
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 5. Skalor
  // X-axel: Mappar ut de 3 spelarnas namn på bredden
  const xScale = d3
    .scalePoint()
    .domain(top3InClan.map(d => d.name))
    .range([0, width])
    .padding(0.4);

  // Y-axel: Linjär skala för poäng
  const maxY = d3.max(top3InClan, d => d.points) || 10;
  const yScale = d3
    .scaleLinear()
    .domain([0, maxY * 1.1])
    .range([height, 0]);

  // Färgskala baserad på dina exakta klanfärger
  const colorScale = d3
    .scaleOrdinal()
    .domain(["MacThomas", "MacDowall", "MacQueen", "MacLeod", "MacKinnon"])
    .range(["#3C4360", "#C80000", "#C8C800", "#5D5B2C", "#6C82BC"]);

  // 6. Rita axlar
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .style("font-size", "8px")
    .style("font-family", "Irish Grover");

  svg.append("g")
    .call(d3.axisLeft(yScale).ticks(4))
    .style("font-size", "8px")
    .style("font-family", "Irish Grover");

  // 7. Rita ut punkterna (Scatterplot)
  const dots = svg
    .selectAll(".dot")
    .data(top3InClan)
    .enter()
    .append("g");

  dots
    .append("circle")
    .attr("cx", d => xScale(d.name))
    .attr("cy", d => yScale(d.points))
    .attr("r", 5)
    .attr("fill", colorScale(clanName))
    .style("stroke", "white")
    .style("stroke-width", "1px");

  // Värden ovanför prickarna
  dots
    .append("text")
    .attr("x", d => xScale(d.name))
    .attr("y", d => yScale(d.points) - 6)
    .attr("text-anchor", "middle")
    .text(d => `${d.points}p`)
    .style("font-size", "8px")
    .style("fill", "#000")
    .style("font-family", "Irish Grover");
}

function displayTop3Players(year) {
  const getBestPlayer = getBestPlayers(year);
  const top3 = getBestPlayer.slice(0, 3); // Ta de 3 första (index 0, 1, 2)

  const top3PlayerContainer = document.getElementById("top3Players");
  top3PlayerContainer.innerHTML = `<p id="top3PlayerTitle">Top 3 Players</p>`;

  for (let i = 0; i < top3.length; i++) {
    let player = top3[i];
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("ranking-card");
    top3PlayerContainer.append(playerDiv);

    const textWrapper = document.createElement("div");
    textWrapper.classList.add("player-text-content");
    playerDiv.append(textWrapper);

    const nameInfo = document.createElement("p");
    nameInfo.classList.add("fontStyleRanking");
    textWrapper.append(nameInfo);

    const pointsInfo = document.createElement("p");
    pointsInfo.classList.add("fontStyleRanking");
    textWrapper.append(pointsInfo);

    playerDiv.append(textWrapper);

    nameInfo.textContent = `Name: ${player.name}`;
    pointsInfo.textContent = `Points: ${player.points}`;

    const imgPlayer = document.createElement("img");
    imgPlayer.classList.add("rankingImg");
    imgPlayer.src = player.img;
    playerDiv.append(imgPlayer);
  }
}

function displayTop3Clans(year) {
  const bestClans = getBestClan(year);
  const top3 = bestClans.slice(0, 3); // Ta de 3 första (index 0, 1, 2)

  const top3ClansContainer = document.getElementById("top3Clans");
  top3ClansContainer.innerHTML = `<p id="top3ClansTitle">Top 3 Clans</p>`;

  for (let i = 0; i < top3.length; i++) {
    let clan = top3[i];
    const clanDiv = document.createElement("div");
    clanDiv.classList.add("ranking-card");
    top3ClansContainer.append(clanDiv);

    const textWrapper = document.createElement("div");
    textWrapper.classList.add("player-text-content");
    clanDiv.append(textWrapper);

    const nameInfo = document.createElement("p");
    nameInfo.classList.add("fontStyleRanking");
    nameInfo.textContent = `Clan: ${clan.clanName}`;
    textWrapper.append(nameInfo);

    const pointsInfo = document.createElement("p");
    pointsInfo.classList.add("fontStyleRanking");
    pointsInfo.textContent = `Points: ${clan.points}`;
    textWrapper.append(pointsInfo);

    const imgCrest = document.createElement("img");
    imgCrest.classList.add("rankingImg");
    imgCrest.src = clan.crest;
    clanDiv.append(imgCrest);
  }
}

function getBestPlayers(year) {
  let resultArray = [];

  for (let person of allParticipants) {
    let playerID = person.id;
    let result = calculatePlayerPoints(playerID, year);
    let playerImg = person.img;

    resultArray.push({
      id: playerID,
      name: person.name,
      points: result,
      img: playerImg,
    });
  }

  for (let i = 0; i < resultArray.length; i++) {
    for (let j = 0; j < resultArray.length - 1; j++) {
      if (resultArray[j].points < resultArray[j + 1].points) {
        let temp = resultArray[j]; //swap
        resultArray[j] = resultArray[j + 1];
        resultArray[j + 1] = temp;
      }
    }
  }

  return resultArray;
}

function calculatePlayerPoints(player_id, year) {
  let thisYear = allSeasons.find((x) => x.year === year);
  let playerID = player_id;
  let playerPlacings = [];

  for (let playerPart of thisYear.competitionDays) {
    for (let event of playerPart.events) {
      let sortedScores = event.scores.slice().sort((a, b) => b.score - a.score);

      let i = 1;

      for (let score of sortedScores) {
        if (score.participantId === playerID) {
          playerPlacings.push({
            year: thisYear.year,
            discipline: event.disciplineId,
            placement: i,
          });
        }
        i++;
      }
    }
  }

  return calculateTotalPoints(playerPlacings);
}

function getBestClan(year) {
  let resultArray = [];

  for (let person of allParticipants) {
    for (let clan of clans) {
      let playerID = person.id;
      let playerClan = person.clan;
      let clanName = clan.name;
      let result = calculatePlayerPoints(playerID, year);

      if (playerClan === clanName) {
        resultArray.push({
          id: playerID,
          name: person.name,
          points: result,
          img: person.img,
          crest: clan.crest,
          tartan: clan.tartan,
          clanName: clan.name,
        });
      }
    }
  }

  resultArray.sort(function (a, b) {
    return b.points - a.points;
  });

  return resultArray;
}

//Funktionsanrop

drawClanMap();
displayTop3Players(2);
displayTop3Clans(2);

function totalPointsPerDicipline(year, dicipline_ID, clanName) {
  let thisYear = allSeasons.find((x) => x.year === year);
  let clanTotalScore = 0;

  for (let competition of thisYear.competitionDays) {
    for (let event of competition.events) {
      if (event.disciplineId === dicipline_ID) {
        let copyEventArray = [...event.scores];

        let scoreSorted = copyEventArray.sort((a, b) => b.score - a.score);

        let placement = 1;

        for (let score of scoreSorted) {
          let player = allParticipants.find(
            (x) => Number(x.id) === Number(score.participantId),
          );

          if (player) {
            if (player.clan === clanName) {
              let pointsMember = getPoints(placement);

              clanTotalScore = clanTotalScore + pointsMember;
            }
          }
          placement++;
        }
      }
    }
  }
  let result = { clan: clanName, points: clanTotalScore };

  return result;
}

function getScores(year, discipline_ID) {
  let scoreArray = [];

  for (let clan of clans) {
    let scorePerClan = totalPointsPerDicipline(9, 1, MacQueen);

    scoreArray.push(scorePerClan);
  }
  console.log(scoreArray);
  return scoreArray;
}

function displayDiscipline() {
  let results = [];
  let points;

  for (let clan of clans) {
    for (let disciplin of disciplines) {
      let pointsPerDicipline = totalPointsPerDicipline(
        9,
        disciplin.id,
        clan.name,
      );
      points = pointsPerDicipline.points;
      results.push(`${clan.name}`, `${disciplin.name}`, points);
    }

    console.log(results);
  }
}

displayDiscipline();


const disciplineSettings = [
  { name: "Moo-off", color: "#FF0FBB" },
  { name: "Mountain Race", color: "#1CB5B5" },
  { name: "Fluff Styling", color: "#48C973" },
  { name: "Whiskey Barrel Kicking", color: "#FF9000" },
  { name: "Bagpipe napping", color: "#A600FF" },
];
