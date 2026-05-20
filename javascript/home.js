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

// console.log(getBestClan(9));

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
displayTop3Players(9);
displayTop3Clans(9);

// //RÄKNAR UT HUR MYCKET KLANEN HAR SAMLAT IN UNDER DEN GRENEN (DISCIPLINE) UNDER DET ÅRET.
// function totalPointsPerDicipline(year, dicipline_ID, clanName) {
//   let thisYear = allSeasons.find((x) => x.year === year);
//   let clanTotalScore = 0;

//   for (let competition of thisYear.competitionDays) {
//     for (let event of competition.events) {
//       if (event.disciplineId === dicipline_ID) {
//         let copyEventArray = [...event.scores];

//         let scoreSorted = copyEventArray.sort((a, b) => b.score - a.score);

//         let placement = 1;

//         for (let score of scoreSorted) {
//           let player = allParticipants.find(
//             (x) => Number(x.id) === Number(score.participantId),
//           );

//           if (player) {
//             if (player.clan === clanName) {
//               let pointsMember = getPoints(placement);

//               clanTotalScore = clanTotalScore + pointsMember;
//             }
//           }
//           placement++;
//         }
//       }
//     }
//   }
//   let result = { clan: clanName, points: clanTotalScore };

//   return result;
// }

function totalPointsPerDicipline(year, dicipline_ID, clanName) {
  let clanTotalScore = 0;

  // 1. Hitta rätt år med en vanlig loop
  let thisYear = null;
  for (let i = 0; i < allSeasons.length; i++) {
    if (allSeasons[i].year === year) {
      thisYear = allSeasons[i];
      break; // Vi hittade året, hoppa ut!
    }
  }

  // Om året inte finns, avsluta tidigt
  if (!thisYear) {
    return { clan: clanName, points: 0 };
  }

  // 2. Loopa igenom tävlingsdagar och grenar
  for (let competition of thisYear.competitionDays) {
    for (let event of competition.events) {
      // Kolla om detta är grenen vi letar efter
      if (event.disciplineId === dicipline_ID) {
        // 3. Loopa igenom alla resultat i grenen
        for (let score of event.scores) {
          // --- ENKEL NYBÖRJARLÖSNING FÖR PLACERING (Ersätter .sort) ---
          // Vi startar på placering 1 och plussar på för varje person som var bättre
          let placement = 1;
          for (let otherScore of event.scores) {
            if (otherScore.score > score.score) {
              placement++; // Någon hade högre poäng, så vår placering sjunker
            }
          }
          // ------------------------------------------------------------

          // 4. Hitta spelaren med en vanlig loop
          let player = null;
          for (let p = 0; p < allParticipants.length; p++) {
            if (Number(allParticipants[p].id) === Number(score.participantId)) {
              player = allParticipants[p];
              break; // Hittade spelaren, hoppa ut!
            }
          }

          // 5. Om spelaren tillhör klanen, hämta poäng för placeringen
          if (player) {
            if (player.clan === clanName) {
              let pointsMember = getPoints(placement);
              clanTotalScore = clanTotalScore + pointsMember;
            }
          }
        }
      }
    }
  }

  let result = { clan: clanName, points: clanTotalScore };
  return result;
}

// console.log(totalPointsPerDicipline(9, 2, "MacQueen"));

function getScores(year, discipline_ID) {
  let scoreArray = [];

  for (let clan of clans) {
    let scorePerClan = totalPointsPerDicipline(9, 1, "MacQueen");

    scoreArray.push(scorePerClan);
  }
  // console.log(scoreArray);
  return scoreArray;
}

//scatterplot

function playerScores(year) {
  let allPlayersScore = getBestPlayers(year);

  let activePlayers = [];

  for (let player of allPlayersScore) {
    if (player.points != 0) {
      activePlayers.push(player);
    }
  }

  return activePlayers;
}
// console.log(playerScores(9));

//värdena för scatterplot

function drawScatterPlot() {
  let allPlayers = playerScores(9);

  // en array med enbart poängen (i storleksordning dessutom, så det är lätt att hitta högsta värdet, vilket vi vill använda när vi skapar y-axeln)
  let points = allPlayers.map((x) => x.points);

  return points;
  // console.log(points)
}



//DIAGRAM MED DELTAGARNA (PARTICIPANTS) OCH DERAS POÄNG

function participantsScoresChart(clanName) {
  const highestPointsList = drawScatterPlot();
  console.log(highestPointsList)
  const scoresPlayers = playerScores(9);

  const wSvg = 200, hSvg = 200;
  const padding = 40;
  const vWiz = wSvg - 2 * padding;
  
  let allDisciplines = [];
  // let maxPoints = 0;

  for (let clan of clans) {
    if (clan.name === clanName) {

      // for (let highest of highestPointsList) {
      //   if (highestPointsList.points > maxPoints) {
      //     maxPoints = highestPointsList.points;
      //   }
      // }

      for (let discipline of disciplines) {
        allDisciplines.push(discipline.name);
      }

      const svg = d3
        .select("body")
        .append("svg")
        .attr("width", wSvg)
        .attr("height", hSvg)
        .style("backgrond-color", "yellow")
        .style("border-radius", "20px");

      const xScale = d3
        .scaleBand()
        .domain(allDisciplines)
        .range([padding, wSvg - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([0, highestPointsList])
        .range([hSvg - padding, padding]);

      const nScale = d3.scaleSequential(
        [0, scoresPlayers.points],
        d3.interpolatePuRd,
      );

      svg
        .append("g")
        .call(d3.axisBottom(xScale))
        .attr("transform", `translate( ${hSvg - padding}, 0)`);

      svg
        .append("g")
        .call(d3.axisLeft(yScale))
        .attr("transform", `translate(0, ${padding})`);

      svg
        .selectAll(".player-dot")
        .data()
        .enter()
        .append("circle")
        .attr("class", "player-dot")
        .attr("cx", (d) => xScale(d.discipline))
        .attr("cy", (d) => yScale(d.points))
        .attr("r", 6);
    }
  }
}

console.log(participantsScoresChart("MacThomas"));
