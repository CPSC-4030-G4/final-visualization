import React from "react";
import * as d3 from 'd3';

const initChart = (h, w) => {
  const margin = {top: 30, right: 30, bottom: 70, left: 100}
  let width = w - margin.left - margin.right
  let height = h - margin.top - margin.bottom
  d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black")
}

const drawChart =(data, platforms, publisher) => {
  console.log(publisher)
  const margin = {top: 80, right: 25, bottom: 30, left: 50}
  const width = 900 - margin.left - margin.right 
  const height = 800 - margin.top - margin.bottom

// append the svg object to the body of the page
const svg = d3.select("#heatmap")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

//Read the data
  const platformed_data = data.filter((d)=> {
    return platforms.includes(d['Platform'])
  })

  let genre = Array.from(new Set(platformed_data.map(d => d.Genre)))
  console.log(genre)
  let platform = Array.from(new Set(platformed_data.map(d => d.Platform)))
  console.log(platform)
  let sales = {}
  platformed_data.forEach(element => {
    sales[`${element['Platform']},${element['Genre']}`] = 0 
  })

  platformed_data.forEach((d) => {
    sales[`${d['Platform']},${d['Genre']}`] += Number(d['Global_Sales'])
  })
  
  console.log(sales)

  // Build X scales and axis:
  const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(genre)
    .padding(0.05)
  svg.append("g")
    .style("font-size", 15)
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  const y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(platform)
    .padding(0.05)
  svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  let myColor = null;
  // Build color scale
  if(publisher === "Nintendo"){
  myColor = d3.scaleSequential()
    .interpolator(d3.interpolateReds)
    .domain([1,100])
  }
  if(publisher === "Sony"){
    myColor = d3.scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain([1,100])
    }
  if(publisher === "Microsoft"){
    myColor = d3.scaleSequential()
      .interpolator(d3.interpolateGreens)
      .domain([1,100])
  }

  // create a tooltip
  const tooltip = d3.select("#heatmap")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event,d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  const mousemove = function(event,d) {
    tooltip
      .html("$" + Math.round(100*sales[`${d['Platform']},${d['Genre']}`])/100 + " million")
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2 + "px")
      .attr("fill", "black")
  }
  const mouseleave = function(event,d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svg.selectAll()
    .data(platformed_data, function(d) {return d.Genre+':'+d.Platform})
    .join("rect")
      .attr("x", function(d) { return x(d.Genre) })
      .attr("y", function(d) { return y(d.Platform) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(sales[`${d['Platform']},${d['Genre']}`])} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

// Add title to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("Global Sales of Genre by Platform (in millions")

// Add subtitle to graph
// svg.append("text")
//         .attr("x", 0)
//         .attr("y", -20)
//         .attr("text-anchor", "left")
//         .style("font-size", "14px")
//         .style("fill", "grey")
//         .style("max-width", 400)
//         .text("Global sales of a genre on a given platform (in millions)")

}

const Heatmap = (props) => {
  var div = d3.select("#heatmap");
  div.selectAll("*").remove();
   initChart(460, 400)
   drawChart(props.dataset, props.platforms, props.publisher)
   if (props.publisher == "Nintendo") {
    return(
     <div>
      <div id="heatmap"></div>
      <img src="https://cdn.discordapp.com/attachments/593601038162984961/916191037796544522/Screen_Shot_2021-12-02_at_11.55.49_PM.png" width="800" height="42"></img>
    </div>
    )
  }
  if (props.publisher == "Sony") {
    return(
     <div>
      <div id="heatmap"></div>
      <img src="https://cdn.discordapp.com/attachments/593601038162984961/916191228670935080/Screen_Shot_2021-12-02_at_11.56.41_PM.png" width="800" height="42"></img>
    </div>
    )
  }
  if (props.publisher == "Microsoft") {
    return(
     <div>
      <div id="heatmap"></div>
      <img src="https://cdn.discordapp.com/attachments/593601038162984961/916191394438185000/Screen_Shot_2021-12-02_at_11.57.20_PM.png" width="800" height="42"></img>
    </div>
    )
  }
}

export default Heatmap
