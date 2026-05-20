const seasonButtons = document.querySelectorAll(".filteringBoxesDIV");
const disciplineIds = [1, 2, 3, 4, 5];
const colors = {
    1: "#FF0FBB", // Moo-Off (pink)
    2: "#1CB5B5", // Mountain Race
    3: "#48C973", // Fluff-styling
    4: "#FF9000", // Whiskey Barrel
    5: "#A600FF"  // Bagpipe
};
const wStack = 1000;
const hStack = 500;
const mStack = { top: 20, right: 180, bottom: 60, left: 60 };

function getGlobalMax () {
  let globalMax = 0;

  for (let season of allSeasons) {
    for (let disciplineId of disciplineIds) {
      let scores = getScores(season.year, disciplineId);
      for (let score of scores) {
        if (score.points > globalMax) {
          globalMax = score.points;
        }
      }
    }
  }
  return globalMax;
}
getGlobalMax();

console.log("Hej", getGlobalMax());


//total poäng per klan per tävlingsgren
function totalPointsPerDicipline(year, dicipline_ID, clanName) {
  let thisYear = allSeasons.find(x => x.year === year);
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

function drawStackedChart(season) {
  d3.select("#stackedChart").selectAll("*").remove();
  const stacked_Data = getStackedClanData(season);
  const svg = d3.select("#stackedChart")
    .attr("width", wStack)
    .attr("height", hStack)

  const stack = d3.stack().keys(disciplineIds);
  const series = stack(stacked_Data);

  const yMax = d3.max(series, layer => d3.max(layer, d => d[1]));
  const xStack = d3.scaleBand()
        .domain(stacked_Data.map(d => d.clan))
        .range([mStack.left, wStack - mStack.right])
        .padding(0.3)
  const yStack = d3.scaleLinear()
        .domain([0, yMax])
        .nice()   
        .range([hStack - mStack.bottom, mStack.top]);

        svg.append("g")
        .attr("transform", `translate(${mStack.left}, 0)`)
        .call(d3.axisLeft(yStack));
    
    svg.append("g")
        .attr("transform", `translate(0, ${hStack - mStack.bottom})`)
        .call(d3.axisBottom(xStack));
    
    // Rita en grupp per disciplin (= ett lager)
    svg.append("g")
    .selectAll("g")
    .data(series)
    .enter()
    .append("g")
        .attr("fill", d => colors[d.key])
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
        .attr("x", d => xStack(d.data.clan))
        .attr("width", xStack.bandwidth())
        .attr("y", hStack - mStack.bottom)
        .attr("height", 0)
        .transition()
        .duration(800)
        .ease(d3.easeCubicOut)
        .attr("y", d => yStack(d[1]))
        .attr("height", d => yStack(d[0]) - yStack(d[1]));

  const legendItems = disciplineIds.map(id => ({
    id: id,
    name: disciplines.find(d => d.id === id).name,
    color: colors[id]
}));

  const legend = svg.append("g")
    .attr("transform", `translate(${wStack - mStack.right + 20}, ${mStack.top})`);

  const legendRow = legend.selectAll("g")
    .data(legendItems)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * 22})`);

legendRow.append("rect")
    .attr("width", 16)
    .attr("height", 16)
    .attr("fill", d => d.color);

legendRow.append("text")
    .attr("x", 22)
    .attr("y", 13)
    .style("font-size", "13px")
    .text(d => d.name);

}

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
    .domain([0, getGlobalMax()])
    .range([hSvg - hPad, hPad]);

  let hScale = d3.scaleLinear()
    .domain([0, getGlobalMax()])
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

for (let btn of seasonButtons) {
  btn.addEventListener("click", function () {
      const season = Number(btn.dataset.season);
      drawStackedChart(season);
  });
}

drawAllDiagrams(0);
drawStackedChart(1);

