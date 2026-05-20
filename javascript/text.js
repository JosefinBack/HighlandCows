function drawClanPie() {
  let mapData = getClanMapData(9);

  let clanPositions = [
    { clan: "MacThomas", x: 300, y: 170 },
    { clan: "Macqueen", x: 360, y: 360 },
    { clan: "Macleod of the Lewes", x: 300, y: 390 },
    { clan: "Mackinnon", x: 350, y: 270 },
    { clan: "MacDonall", x: 380, y: 200 },
  ];

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

  // Inställningar för pajerna
  let radius = 20;
  let arcGenerator = d3.arc().innerRadius(0.1).outerRadius(radius);
  let pieGenerator = d3.pie().value((d) => d.value);

  // let hoverText = d3
  //   .select("body")
  //   .append("div")
  //   .style("position", "absolute")
  //   .style("background", "#FBE49F")
  //   .style("font-family", "Irish Grover")
  //   .style("padding", "6px")
  //   .style("border-radius", "5px")
  //   .style("display", "none")
  //   .style("pointer-events", "none")
  //   .style("border", "1px solid white")

  let colorScale = d3
    .scaleOrdinal()
    .domain(disciplineSettings.map((d) => d.name))
    .range(disciplineSettings.map((d) => d.color));

  // Skapa en grupp för varje klan
  let clanGroups = svg
    .selectAll("g.clan-pie")
    .data(mapData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x}, ${d.y})`)

    // .on("mouseover", function (event, d) {
    //   hoverText
    //   .style("display", "block").text(d.clan).text(d.disciplin);
    // })
    // .on("mouseout", function () {
    //   hoverText.style("display", "none");
    // })
    // .on("click", function (event, d) {
    //   localStorage.setItem("selectedClan", d.clan);
    //   window.location.href = "../html/clanPage.html";
    // });

  // För varje klan-grupp, rita tårtbitarna
  clanGroups.each(function (d) {
    let group = d3.select(this);
    let slices = pieGenerator(d.pointsData);

    group
      .selectAll("path")
      .data(slices)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      // .attr("fill", (nodes, i, d) => {
      //   // Enkel färgskala
      //   const colors = (d) => disciplineSettings(d.color);
      //   return colors[i % colors.length];
      // })
      .attr("fill", (d) => colorScale(d))
      .style("stroke", "white")
      .style("stroke-width", "1px");
  });
}



function drawClanMap() {
  let mapData = getClanMapData(9);

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

  // let radius = 20;
  // let arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
  // let pieGenerator = d3.pie().value((d) => d.value);

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

  // Inuti din drawClanMap loop för cirklar:
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
    // Inuti drawClanMap, leta upp din .on("mouseover"...)
    .on("mouseover", function (event, d) {
      // 1. Visa tooltip och töm den så gammal info försvinner
      tooltip.style("display", "block").html("");

      // 2. Lägg till klanens namn
      tooltip
        .append("strong")
        .style("display", "block")
        .style("text-align", "center")
        .text(d.clan);

      // 3. Hämta datan (år 9 som i din kod)
      const allMapData = getClanMapData(9);
      const specificClanData = allMapData.find((item) => item.clan === d.clan);

      if (specificClanData) {
        // 4. Rita pajen först
        displayPie(tooltip, specificClanData);

        // 5. Anropa din resultatfunktion direkt under
        displayResults(tooltip, specificClanData);
      }

      d3.select(event.currentTarget).transition().attr("r", 12);
    })
    // .on("mouseover", function (event, d) {
    //   // 1. Visa tooltip
    //   tooltip.style("display", "block");

    //   // 2. Sätt rubrik (Klanens namn)
    //   tooltip.html(`<strong>${d.clan}</strong><br>`);

    //   // 3. Hämta datan för just denna klan (år 9 som i ditt exempel)
    //   const allMapData = getClanMapData(9);
    //   const specificClanData = allMapData.find((item) => item.clan === d.clan);

    //   // 4. Rita pajen inuti tooltipen
    //   if (specificClanData) {
    //     displayPiep(tooltip, specificClanData);
    //   }

    //   d3.select(event.currentTarget).transition().attr("r", 12);
    // })
    .on("mousemove", function (event) {
      tooltip
        .style("left", event.pageX + 15 + "px")
        .style("top", event.pageY - 50 + "px");
    })
    .on("mouseout", function (event) {
      tooltip.style("display", "none");
      d3.select(event.currentTarget).transition().attr("r", 8);
    });

  // svg
  //   .selectAll("circle")
  //   .data(clanPositions)
  //   .enter()
  //   .append("circle")
  //   .attr("cx", (d) => d.x)
  //   .attr("cy", (d) => d.y)
  //   .attr("r", 8)
  //   .style("stroke", "white")
  //   .attr("fill", (d) => colorScale(d.clan))

  //   .on("mouseover", function (event, d) {
  //     tooltip.style("display", "block").text(d.clan);

  //     d3.select(event.currentTarget)
  //      // gör cirkeln större
  //   })

  //   .on("mousemove", function (event) {
  //     tooltip
  //       .style("left", event.pageX + 10 + "px")
  //       .style("top", event.pageY + "px");
  //   })

  //   .on("mouseout", function (event) {
  //     tooltip.style("display", "none");

  //     d3.select(event.currentTarget).attr("r", 8); // tillbaka till normal
  //   })

  //   .on("click", function (event, d) {
  //     localStorage.setItem("selectedClan", d.clan);
  //     window.location.href = "../html/clanPage.html";
  //   });

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



function setupColorLegend() {
  const colorBoxes = document.querySelectorAll(".colorBox");

  for (let i = 0; i < disciplines.length; i++) {
    if (colorBoxes[i]) {
      const box = colorBoxes[i];
      const colorDiv = box.querySelector(".color");
      const textP = box.querySelector(".p-discipline");

      colorDiv.style.backgroundColor = disciplines[i].color;
      textP.textContent = disciplines[i].name;
    }
  }
}

setupColorLegend();


function displayResults(container, clanData) {
  let totalPoints = 0;
  let mouseoverWrapper = document.createElement("div");
  let pDiscipline = container
    .append("p")
    .style("margin", "2px 0")
    .style("font-size", "8px");

  let pPoints = container
    .append("p")
    .style("margin", "2px 0")
    .style("font-size", "8px");

  mouseoverWrapper.append(pDiscipline);
  mouseoverWrapper.append(pPoints);

  for (let i = 0; i < clanData.pointsData.length; i++) {
    totalPoints += clanData.pointsData[i].value;
  }

  pPoints.textContent = `${totalPoints}`;

  // Om du vill visa disciplinerna utan forEach kan du använda en vanlig for-loop:
  for (let i = 0; i < clanData.pointsData.length; i++) {
    container
      .append("div")
      .attr("id", "style")
      .style("padding", "3px")
      .text(
        `${clanData.pointsData[i].disciplineName}: ${clanData.pointsData[i].value} p`,
      );
  }
}







function drawClanPie() {
  let clanPositions = [
    { clan: "MacThomas", x: 300, y: 170 },
    { clan: "Macqueen", x: 360, y: 360 },
    { clan: "Macleod of the Lewes", x: 300, y: 390 },
    { clan: "Mackinnon", x: 350, y: 270 },
    { clan: "MacDonall", x: 380, y: 200 },
  ];
  
  const disciplineSettings = [
    { name: "Moo-off", color: "#FF0FBB" },
    { name: "Mountain Race", color: "#1CB5B5" },
    { name: "Fluff Styling", color: "#48C973" },
    { name: "Whiskey Barrel Kicking", color: "#FF9000" },
    { name: "Bagpipe napping", color: "#A600FF" },
  ];
  let mapData = getClanMapData(9); // Innehåller x, y och points
  let radius = 20;

  let svg = d3.select("#svg-map svg");
  let arc = d3
    .arc()
    .innerRadius(10) 
    .outerRadius(radius);

  let pie = d3.pie().value((d) => d.value);

  let colorScale = d3
    .scaleOrdinal()
    .domain(disciplineSettings.map((d) => d.name))
    .range(disciplineSettings.map((d) => d.color));

  let clanGroups = svg
    .selectAll("g.clan-pie")
    .data(mapData) // klandata för positioner
    .enter()
    .append("g")
    .attr("class", "clan-pie")
    .attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    
    clanGroups
    .selectAll("path")
    .data((d) => pie(d.pointsData)) 
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => colorScale(d.data.disciplineName))
    .style("stroke", "white");
}




function getClanMapData(year) {
  let clanPositions = [
    { clan: "MacThomas", x: 300, y: 170 },
    { clan: "Macqueen", x: 360, y: 360 },
    { clan: "Macleod of the Lewes", x: 300, y: 390 },
    { clan: "Mackinnon", x: 350, y: 270 },
    { clan: "MacDonall", x: 380, y: 200 },
  ];

  let finalData = [];

  for (let pos of clanPositions) {
    let pointsArray = [];

    for (let disc of disciplines) {
      let result = totalPointsPerDicipline(year, disc.id, pos.clan);

      pointsArray.push({
        disciplineName: disc.name,
        value: result.points, // Detta är "tårtbitens" storlek
      });
    }

    finalData.push({
      clan: pos.clan,
      x: pos.x,
      y: pos.y,
      pointsData: pointsArray,
    });
  }

  return finalData;
}


function displayPie(container, clanData) {
  const size = 100; // Storleken på mini-pajen
  const radius = size / 2;

  // Rensa gammalt innehåll (så de inte staplas)
  container.selectAll("svg").remove();

  const svg = container
    .append("svg")
    .attr("width", size)
    .attr("height", size)
    .append("g")
    .attr("transform", `translate(${radius}, ${radius})`);

  const pieGenerator = d3.pie().value((d) => d.value);
  const arcGenerator = d3.arc().innerRadius(100).outerRadius(radius);

  // Använd färgerna från din disciplineSettings-array
  const slices = pieGenerator(clanData.pointsData);

  svg
    .selectAll("path")
    .data(slices)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .style("stroke", "white")
    .style("stroke-width", "1px")

    .attr("fill", (d) => {
      let currentName = d.data.disciplineName;
      let chosenColor;
      for (let i = 0; i < disciplineSettings.length; i++) {
        if (disciplineSettings[i].name === currentName) {
          chosenColor = disciplineSettings[i].color;
          break;
        }
      }
      return chosenColor;
    });
}

function displayResults(container, clanData) {
  for (let i = 0; i < clanData.pointsData.length; i++) {
    container
      .append("div")
      .attr("id", "style")
      .style("padding", "3px")
      .text(
        `${clanData.pointsData[i].disciplineName}: ${clanData.pointsData[i].value} p`,
      );
  }
}
