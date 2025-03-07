const pieUrl =
  "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction";
d3.json(pieUrl).then((data) => {
  //console.log(data.transaction);
  const pieData = data.transaction; //verify in console the data is loaded

  //Create colorScales for the pie Chart
  //Each of the section/slice will have different color
  const color = d3.scaleOrdinal(d3.schemeSet2);

  const pieWidth = 500;
  const pieHeight = 500;
  const pieRadius = Math.min(pieWidth, pieHeight) / 2 - 20; //20 is the padding

  const svg = d3
    .select("#pie-chart")
    .attr("width", pieWidth)
    .attr("height", pieHeight)
    .append("g")
    .attr("transform", `translate(${pieWidth / 2}, ${pieHeight / 2})`);

  //Create the pie function
  const pie = d3.pie().value((d) => d.lcAmt); //d.value is the value of the data (stocks)

  //Create the arc generator
  const arc = d3.arc().innerRadius(0).outerRadius(pieRadius);

  //Create expanded arc generator for hover effect
  const arcHover = d3
    .arc()
    .innerRadius(0)
    .outerRadius(pieRadius + 10);

  //Draw the pie chart

  const slices = svg
    .selectAll("path")
    .data(pie(pieData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i))
    .attr("stroke", "#fff")
    .style("stroke-width", "2px")
    .style("cursor", "pointer")
    .on("mouseover", function (event, data) {
      d3.select(this).transition().duration(1000).attr("d", arcHover);
      //console.log(data.data.cifName);
      //console.log(event.pageX + 10 + "px");
      //console.log(data.data.cifName);
      d3.select("#tooltip")
        .style("display", "block")
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 10 + "px")
        .html(`Name: ${data.data.cifName} <br/>Amount: ${data.data.lcAmt}`);
    })
    .on("mouseout", function (event, data) {
      d3.select(this).transition().duration(1000).attr("d", arc);
      d3.select("#tooltip").style("display", "none");
    });
});
