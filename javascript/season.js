const data = getClanTotalScoreBySeason(1);
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