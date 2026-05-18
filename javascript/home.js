const startButton = document.getElementById("start-Button");
const seasonButton = document.getElementById("season-Button");
const eventButton = document.getElementById("event-Button");
const clansButton = document.getElementById("clans-Button");
const historyButton = document.getElementById("history-Button");
const main = document.querySelector("main");

const top3PlayerWrapper = document.getElementById("top3Players");

function landingPage() {
  main.innerHTML = ``;
  main.innerHTML = `
    
    <div id="pageWrapper">
    <div id="imgWrapper">
        <img id="highlandIMG"src="../pic/Bakgrunder/StartsidaBakgrund.png"></img>
        <h2 id="welcomeHighlandCow">WELCOME TO THE HIGHLAND COW TOURNAMENT</h2>
        </div>

    <div id="aboutContainer">
    <div id="aboutWrapper">
        <h2 id="aboutTitle" class="subtitle">ABOUT</h2>
        <p id="part1">The modern image of clans, each with their own tartan and specific land, was promulgated by the Scottish author Sir Walter Scott after influence by others. Historically, tartan designs were associated with Lowland and Highland districts whose weavers tended to produce cloth patterns favoured in those districts. By process of social evolution, it followed that the clans/families prominent in a particular district would wear the tartan of that district, and it was but a short step for that community to become identified by it. </p>
        <p id="part2">Many clans have their own clan chief; those that do not are known as armigerous clans. Clans generally identify with geographical areas originally controlled by their founders, sometimes with an ancestral castle and clan gatherings, which form a regular part of the social scene. The most notable clan event of recent times was The Gathering 2009 in Edinburgh, which attracted at least 47,000 participants from around the world.</p>
        <p id="part3">It is a common misconception that every person who bears a clan's name is a lineal descendant of the chiefs. Many clansmen, although not related to the chief, took the chief's surname as their own either to show solidarity or to obtain basic protection or for much needed sustenance. Most of the followers of the clan were tenants, who supplied labour to the clan leaders.</p>
        </div>
    <div id="svg-map"></div> 
    
    </div>

     <div id="rankingWrapper">
        <h2 id="rankingTitle" class="subtitle">RANKING</h2>
        <div id="topRankingWrapper">
        <div id="top3Players">
        </div>
        
        <div id="top3Clans">
        </div>
        
        </div>
        </div>
    `;
}

landingPage();
drawClanMap();
displayTop3Players(2);
displayTop3Clans(2);

function drawClanMap() {
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

  let clanPositions = [
    { clan: "MacThomas", x: 300, y: 170 },
    { clan: "Macqueen", x: 360, y: 360 },
    { clan: "Macleod of the Lewes", x: 300, y: 390 },
    { clan: "Mackinnon", x: 350, y: 270 },
    { clan: "MacDonall", x: 380, y: 200 },
  ];

  let colorScale = d3
    .scaleOrdinal()
    .domain(clanPositions.map((d) => d.clan))
    .range(["#3C4360", "#C80000", "#C8C800", "#5D5B2C", "#6C82BC"]); //ändra mackenzie till maxdonall

  let tooltip = d3
    .select("body")
    .append("div")
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
      tooltip
        .style("display", "block")
        .text(d.clan);

      d3.select(event.currentTarget).attr("r", 12); // gör cirkeln större
    })

    .on("mousemove", function (event) {
      tooltip
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY + "px");
    })

    .on("mouseout", function (event) {
      tooltip
        .style("display", "none");

        d3.select(event.currentTarget).attr("r", 8); // tillbaka till normal
    })

    .on("click", function (event, d) {
      localStorage.setItem("selectedClan", d.clan);
      window.location.href = "../html/clanPage.html";
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

function calculatePlayerPoints(player_id, year) {
  let thisYear = threeSeasons.find((x) => x.year === year);
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
          clanName : clan.name
        });
      }
    }
  }

  resultArray.sort(function (a, b) {
    return b.points - a.points;
  });

  return resultArray;
}

function chooseClanPage(){

}