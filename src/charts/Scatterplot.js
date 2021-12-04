import {useState, useEffect} from "react";
import * as d3 from 'd3'
import { MenuItem, FormControl, InputLabel, Box, Select } from "@mui/material";

const drawChart = (data, platforms, region) => {

  const platformed_data = data.filter((d)=> {
      return platforms.includes(d['Platform'])
  })

    const margin = {top: 30, right: 115, bottom: 40, left: 40}
    const width = 1125 - margin.left - margin.right
    const height = 638 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Sales By Region");

  const color = d3.scaleOrdinal()
                .domain(["Sports", "Platform", "Racing", "Role-Playing", "Shooter", "Simulation", "Action", "Fighting", "Adventure", "Strategy", "Misc", "Puzzle"])
                .range(["red", "blue", "yellow", "green", "orange", "purple", "pink", "gray", "brown", "lightgreen", "magenta", "cyan"])

  // // Handmade legend
  svg.append("circle").attr("cx",width + 20).attr("cy", margin.top).attr("r", 5).style("fill", "red")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 15).attr("r", 5).style("fill", "blue")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 30).attr("r", 5).style("fill", "yellow")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 45).attr("r", 5).style("fill", "green")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 60).attr("r", 5).style("fill", "orange")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 75).attr("r", 5).style("fill", "purple")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 90).attr("r", 5).style("fill", "pink")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 105).attr("r", 5).style("fill", "gray")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 120).attr("r", 5).style("fill", "brown")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 135).attr("r", 5).style("fill", "lightgreen")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 150).attr("r", 5).style("fill", "magenta")
  svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 165).attr("r", 5).style("fill", "cyan")
  svg.append("text").attr("x", width + 30).attr("y", margin.top).text("Sport").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 15).text("Platformer").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 30).text("Racing").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 45).text("RPG").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 60).text("Shooter").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 75).text("Simulation").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 90).text("Action").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 105).text("Fighting").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 120).text("Adventure").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 135).text("Strategy").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 150).text("Misc").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", width + 30).attr("y", margin.top + 165).text("Puzzle").style("font-size", "15px").attr("alignment-baseline","middle")
  // Add X axis
  const xScale = d3.scaleSymlog()
          .domain([0, d3.max(platformed_data, function(d) { return +d["NA_Sales"] })])
          .range([ 0, width]);

          
  var xAxis = d3.axisBottom(xScale)

  var xLabel = svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", (width + margin.right + margin.left) / 2)
    .attr("y", height + 30)
    .text("North America Sales (Millions)");

  // // Add Y axis
  const yScale = d3.scaleSymlog()
    .domain([0, d3.max(platformed_data, function(d) { return +d["EU_Sales"] })])
    .range([height, 0]);

  var yAxis = d3.axisLeft(yScale)

  var yLabel = svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -(height - margin.top - margin.bottom) / 2)
    .attr("y", -35)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Europe Sales (Millions)");

  const tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

  const mousemove = function(event,d) {
    d3.select(this).transition()
      .duration('100')
      .attr("r", 10);
    tooltip
      .html(`${d.Name} (${d.Platform})`)
      .style("visibility", "visible")
      .style("left", (event.pageX) + 15 + "px")
      .style("top", (event.pageY) + 15 + "px")
  }
  const mouseout = function(event,d) {
    d3.select(this).transition()
      .duration('200')
      .attr("r", 5);
    tooltip
      .transition()
      .duration(200)
      .style("visibility", "hidden")
  }

  // Add dots
  var dots = svg.append('g')
                .selectAll("dot")
                .data(platformed_data)
                .join("circle")
                .attr("cx", function (d) { return xScale(+d["NA_Sales"]); } )
                .attr("cy", function (d) { return yScale(+d["EU_Sales"]); } )
                .attr("r", 5)
                .style("fill", function (d) {return color(d.Genre)})
                .style("padding", "10px")
                .attr("stroke", "#000000")
                .attr("stroke-width", "1.5")
                .on('mousemove', mousemove)
                .on('mouseout', mouseout);

  var changing_x_axis = svg.append("g")
    .attr("transform", "translate("+0+","+height+")")
    .call(xAxis)

  var changing_y_axis = svg.append("g")
    .call(yAxis)


  if(region === "naveu"){
    let xRegion = "NA_Sales"
    let yRegion = "EU_Sales"

    xScale
        .domain([0, d3.max(platformed_data.map(function(d){return d[xRegion]}), s => +s)])
    yScale
        .domain([0, d3.max(platformed_data.map(function(d){return d[yRegion]}), s => +s)])

    xLabel
      .text("North America Sales (Millions)")
    yLabel
      .text("Europe Sales (Millions)")

    dots.transition()
      .duration('500')
      .attr("cx", function (d) { return xScale(+d[xRegion]); } )
      .attr("cy", function (d) { return yScale(+d[yRegion]); } )
      .attr("r", 5)
      .style("fill", function (d) {return color(d.Genre)})
      .style("padding", "10px")
      .attr("stroke", "#000000")
      .attr("stroke-width", "1.5")

    changing_x_axis.transition()
      .call(xAxis)

    changing_y_axis.transition()
      .call(yAxis)
  }
  if(region === "navjp") {
    let xRegion = "NA_Sales"
    let yRegion = "JP_Sales"

    xScale
        .domain([0, d3.max(platformed_data.map(function(d){return d[xRegion]}), s => +s)])
    yScale
        .domain([0, d3.max(platformed_data.map(function(d){return d[yRegion]}), s => +s)])

    xLabel
      .text("North America Sales (Millions)")
    yLabel
      .text("Japan Sales (Millions)")


    dots.transition()
      .duration('1000')
      .attr("cx", function (d) { return xScale(+d[xRegion]); } )
      .attr("cy", function (d) { return yScale(+d[yRegion]); } )
      .attr("r", 5)
      .style("fill", function (d) {return color(d.Genre)})
      .style("padding", "10px")
      .attr("stroke", "#000000")
      .attr("stroke-width", "1.5")

    changing_x_axis.transition()
      .call(xAxis)

    changing_y_axis.transition()
      .call(yAxis)
  }

  if(region === "euvjp"){
    let xRegion = "EU_Sales"
    let yRegion = "JP_Sales"

    xScale
        .domain([0, d3.max(platformed_data.map(function(d){return d[xRegion]}), s => +s)])
    yScale
        .domain([0, d3.max(platformed_data.map(function(d){return d[yRegion]}), s => +s)])

    xLabel
      .text("Europe Sales (Millions)")
    yLabel
      .text("Japan Sales (Millions)")


    dots.transition()
      .duration('1000')
      .attr("cx", function (d) { return xScale(+d[xRegion]); } )
      .attr("cy", function (d) { return yScale(+d[yRegion]); } )
      .attr("r", 5)
      .style("fill", function (d) {return color(d.Genre)})
      .style("padding", "10px")
      .attr("stroke", "#000000")
      .attr("stroke-width", "1.5")

    changing_x_axis.transition()
      .call(xAxis)

    changing_y_axis.transition()
      .call(yAxis)
  }
}


const Scatterplot = (props) => {
  const [regions, setRegions] = useState("naveu")
  const handleChange = (event) => {
    console.log(event.target.value)
    setRegions(event.target.value)
  }

  var div = d3.select("#my_dataviz");
  div.selectAll("*").remove();
  drawChart(props.dataset, props.platforms, regions)

  return (
      <div>
        <h3 id="chart-title"></h3>
        <div id="my_dataviz"></div>
          <label>Choose the regions to compare:</label>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Regions</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Publisher"
                value={regions}
                onChange={handleChange}
              >
                <MenuItem value="naveu">North America vs. Europe</MenuItem>
                <MenuItem value="navjp">North America vs. Japan</MenuItem>
                <MenuItem value="euvjp">Europe vs. Japan</MenuItem>
              </Select>
              </FormControl>
          </Box>
      </div>
    )
}

export default  Scatterplot;
