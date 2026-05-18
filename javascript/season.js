const data = getClanPlacementPointBySeason(1);
const colors = ["#e63946", "#2a9d8f", "#e9c46a", "#457b9d", "#8338ec"];

const wSvg = 800;
const hSvg = 400;

const margin = { top: 20, right: 20, bottom: 40, left: 60 };

const svg = d3.select("#chart")
  .attr("width", wSvg)
  .attr("height", hSvg)

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.points)])
  .range([hSvg - margin.bottom, margin.top]);

const x = d3.scaleBand()
  .domain(data.map(d => d.clan))
  .range([margin.left, wSvg - margin.right])
  .padding(0.2);

svg.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(y));

svg.append("g")
  .attr("transform", `translate(0, ${hSvg - margin.bottom})`)
  .call(d3.axisBottom(x));

svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.clan))
  .attr("y", d => y(d.points))
  //Bandwidth() räknar automatiskt ut hur bred varje stapel ska 
  // vara baserat på antal klaner, range och padding
  .attr("width", x.bandwidth())
  .attr("height", d => hSvg - margin.bottom - y(d.points))
  .attr("fill", (d, i) => colors[i]);


console.log(getClanTotalScoreBySeason(1));

//total poäng per klan per tävlingsgren

function totalPointsPerDicipline(year, dicipline_ID, clanName) {
  let thisYear = threeSeasons.find(x => x.year === year);
  let clanTotalScore = 0;

  for (let competition of thisYear.competitionDays) {
    for (let event of competition.events) {
      if (event.disciplineId === dicipline_ID) {
        let copyEventArray = [...event.scores]

        let scoreSorted = copyEventArray.sort((a, b) => b.score - a.score);

        let placement = 1;


        for (let score of scoreSorted) {
          let player = allParticipants.find(x => Number(x.id) === Number(score.participantId));

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
  // console.log(clanTotalScore);
  let result = { clan: clanName, points: clanTotalScore };

  return result;
}

function getScores(year, discipline_ID) {
  let scoreArray = [];

  for (let clan of clans) {
    let scorePerClan = totalPointsPerDicipline(year, discipline_ID, clan.name);

    scoreArray.push(scorePerClan);
  }
  console.log(scoreArray);
  return scoreArray;
};

//Stapeldiagram
function drawDiagram(year, disciplines_id) {
  let svgDIV;

  if (disciplines_id === 1) {
    svgDIV = document.getElementById("moo-off");

  } else if (disciplines_id === 2) {
    svgDIV = document.getElementById("fluff");

  } else if (disciplines_id === 3) {
    svgDIV = document.getElementById("mountainRace");

  } else if (disciplines_id === 4) {
    svgDIV = document.getElementById("whiskey");

  } else if (disciplines_id === 5) {
    svgDIV = document.getElementById("bagpipe");

  }

  let dataset = getScores(year, disciplines_id);

  let clanNameArray = dataset.map(x => x.clan);

  let highestScore = 0;

  for (let score of dataset) {
    if (score.points > highestScore) {
      highestScore = score.points;
    };
  };

  let hSvg = 400;
  let wSvg = 500;
  let wPad = 50;
  let hPad = 50;

  let svg = d3.select(svgDIV)
    .attr("height", hSvg)
    .attr("width", wSvg)
    .style("border", "1px solid black");

  let xScale = d3.scaleBand()
    .domain(clanNameArray)
    .range([wPad, wSvg - wPad])
    .paddingInner(0.3)
    .paddingOuter(0.2)
    ;

  let yScale = d3.scaleLinear()
    .domain([0, highestScore])
    .range([hSvg - hPad, hPad]);

  let hScale = d3.scaleLinear()
    .domain([0, highestScore])
    .range([0, hSvg - hPad * 2]);


  let xAxel = d3.axisBottom(xScale);
  let yAxel = d3.axisLeft(yScale);

  svg.append("g")
    .call(xAxel)
    .attr("transform", `translate(0, ${hSvg - hPad})`);

  svg.append("g")
    .call(yAxel)
    .attr("transform", `translate(${wPad}, 0)`)

  svg.append("g")
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", setX)
    .attr("y", setY)
    .attr("width", xScale.bandwidth())
    .attr("height", setH)
    .attr("fill", (d, i) => colors[i]);
  ;

  function setX(d) {
    let valueWidth = xScale(d.clan);
    return valueWidth;
  };

  function setY(d) {
    let valueBegin = yScale(d.points);
    return valueBegin;
  };

  function setH(d) {
    let valueHight = hScale(d.points);
    return valueHight;
  };

};

function drawAllDiagrams(year) {
  drawDiagram(year, 1);
  drawDiagram(year, 2);
  drawDiagram(year, 3);
  drawDiagram(year, 4);
  drawDiagram(year, 5);
};

drawAllDiagrams(0);

