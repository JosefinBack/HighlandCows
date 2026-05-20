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

      d3.select(event.currentTarget)  //förklara event.currentTarget
      .transition()
      .attr("r", 12);
    })
    .on("mousemove", function (event) {
      tooltip
        .style("left", event.pageX + 15 + "px") //förklara detta
        .style("top", event.pageY - 50 + "px")
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
  const top3 = getBestPlayer.slice(0, 3); 

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
  const top3 = bestClans.slice(0, 3); 

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

    const imgTartan = document.createElement("img");
    imgTartan.classList.add("rankingImg");
    imgTartan.src = clan.tartan;
    clanDiv.append(imgTartan);
  }
}

function getBestPlayers(year) {
  let resultArray = [];

  for (let person of allParticipants) {
    let result = calculatePlayerPoints(person.id, year);

    resultArray.push({
      season: year + 1,
      id: person.id,
      name: person.name,
      points: result,
      img: person.img,
      clan: person.clan,
    });
  }

  // Sortera högst poäng först
  resultArray.sort(function (a, b) { //förklara denna
    return b.points - a.points;
  });

  return resultArray;
}


function calculatePlayerPoints(player_id, year) {
  let thisYear = allSeasons.find((x) => x.year === year);
  let totalPoints = 0;

  for (let day of thisYear.competitionDays) {
    for (let event of day.events) {
      let sortedScores = event.scores.slice().sort(function (a, b) { //förklara denna
        return b.score - a.score;
      });

      let placement = 1;

      for (let score of sortedScores) {
        if (score.participantId === player_id) {
          let points = getPoints(placement);
          totalPoints = totalPoints + points;
        }
        placement++;
      }
    }
  }
  return totalPoints;
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
console.log(getBestClan(7));

//Funktionsanrop

drawClanMap();
displayTop3Players(9);
displayTop3Clans(9);
drawScatterPlot();

function totalPointsPerDicipline(year, dicipline_ID, clanName) {
  let clanTotalScore = 0;

  let thisYear = null;
  for (let i = 0; i < allSeasons.length; i++) {
    if (allSeasons[i].year === year) {
      thisYear = allSeasons[i];
      break; 
    }
  }

  if (!thisYear) {
    return { clan: clanName, points: 0 };
  }

  for (let competition of thisYear.competitionDays) {
    for (let event of competition.events) {
      if (event.disciplineId === dicipline_ID) {
        for (let score of event.scores) {
          let placement = 1;
          for (let otherScore of event.scores) {
            if (otherScore.score > score.score) {
              placement++;
            }
          }

          let player = null;
          for (let p = 0; p < allParticipants.length; p++) {
            if (Number(allParticipants[p].id) === Number(score.participantId)) {
              player = allParticipants[p];
              break;
            }
          }

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

function getScores(year, discipline_ID) {
  let scoreArray = [];

  for (let clan of clans) {
    let scorePerClan = totalPointsPerDicipline(9, 1, "MacQueen");

    scoreArray.push(scorePerClan);
  }
  return scoreArray;
}

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

function drawScatterPlot() {
  let firstPlace = [];
  let secondPlace = [];
  let thirdPlace = [];

  for (let i = 0; i < 8; i++) {
    let allPlayers = playerScores(i);

    firstPlace.push(allPlayers[0]);
    secondPlace.push(allPlayers[1]);
    thirdPlace.push(allPlayers[2]);
  }

  let dataArrayer = [firstPlace, secondPlace, thirdPlace];
  let seasongs = firstPlace.map((x) => x.season); //gör en ny array med lika många element

  let highestPoint = 0;

  for (let array of dataArrayer) {
    for (let score of array) {
      if (score.points > highestPoint) {
        highestPoint = score.points;
      }
    }
  }

  let hSvg = 400;
  let wSvg = 800;
  let hPad = 50;
  let wPad = 100;

  let svg = d3
    .select("#linjediagram")
    .append("svg")
    .attr("height", hSvg)
    .attr("width", wSvg)
    .style("border", "1px solid black")
    .style("border-radius", "20px");

  let clanInformation = d3
    .select("body")
    .append("div")
    .attr("id", "clan-information")
    .style("pointer-events", "none");

  let xScale = d3
    .scaleBand()
    .domain(seasongs)
    .range([wPad, wSvg - wPad])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  let yScale = d3
    .scaleLinear()
    .domain([1000, highestPoint + 100])
    .range([hSvg - hPad, hPad]);

  let dMaker = d3
    .line()
    .x((d) => xScale(d.season) + xScale.bandwidth() / 2)
    .y((d) => yScale(d.points));

  let xAxel = d3.axisBottom(xScale);
  let yAxel = d3.axisLeft(yScale);

  svg
    .append("g")
    .call(xAxel)
    .attr("transform", `translate(0, ${hSvg - hPad})`);

  svg.append("g").call(yAxel).attr("transform", `translate(${wPad}, 0)`);

  svg
    .append("g")
    .selectAll("path")
    .data(dataArrayer)
    .enter()
    .append("path")
    .attr("stroke", "black")
    .attr("stroke-width", 5.0)
    .attr("fill", "none")
    .attr("stroke", setColor)
    .attr("stroke-width", 2)
    .attr("d", (d) => dMaker(d));

  function setColor(d, i) {
    let colors = ["gold", "silver", "#cd7f32"];
    return colors[i];
  }

  for (let array of dataArrayer) {
    svg
      .append("g")
      .selectAll("circle")
      .data(array)
      .enter()
      .append("circle")
      .attr("fill", "black")
      .attr("cx", setX)
      .attr("cy", setY)
      .attr("r", 2)
      .on("mouseover", function (event, d) {
        clanInformation.style("display", "block").html("");

        clanInformation
          .append("strong")
          .style("display", "block")
          .style("text-align", "center")
          .text(`Player: ${d.name}`);

        clanInformation
          .append("strong")
          .style("display", "block")
          .style("text-align", "center")
          .text(`Clan: ${d.clan}`);

        clanInformation
          .append("strong")
          .style("display", "block")
          .style("text-align", "center")
          .text(`Points: ${d.points}`);

        console.log(d.name);
        console.log(d.clan);
        console.log(d.points);

        d3.select(event.currentTarget).transition().attr("r", 12);
      })
      .on("mousemove", function (event) {
        clanInformation
          .style("left", event.pageX + 15 + "px")

          .style("top", event.pageY - 50 + "px");
      })
      .on("mouseout", function (event) {
        clanInformation.style("display", "none");
        d3.select(event.currentTarget).transition().attr("r", 2);
      });
    console.log(array);

    function setX(d) {
      let valueX = xScale(d.season) + xScale.bandwidth() / 2; //förklara
      return valueX;
    }

    function setY(d) {
      let valueY = yScale(d.points);
      return valueY;
    }
  }
}
