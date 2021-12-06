import {useState, useEffect} from "react";
import * as d3 from 'd3'
import { MenuItem, FormControl, InputLabel, Box, Select } from "@mui/material";

const drawChart = (data, platforms, region, filterPlat) => {

  const platformed_data = data.filter((d)=> {
      return platforms.includes(d['Platform'])
  })

  const margin = {top: 30, right: 115, bottom: 50, left: 50}
  const width = 1125 - margin.left - margin.right
  const height = 638 - margin.top - margin.bottom;
// append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  if(filterPlat === null){
  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Sales By Region");
  }
  else {
    svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text(`Sales By Region for ${filterPlat}`);
  }


  const nintendo = ['Wii', 'GBA', 'GB', 'DS', 'SNES', 'NES', 'WiiU', '3DS', 'GC', 'N64']
  const sony = ['PS2', 'PS3', 'PSV', 'PSP', 'PS', 'PS4']
  const microsoft = ['XB', 'X360', 'XOne']

  const color = d3.scaleOrdinal()
                .domain(["Nintendo", "Sony", "Microsoft"])
                .range(["red", "blue", "green"])

  // // Handmade legend
  // svg.append("circle").attr("cx",width + 20).attr("cy", margin.top).attr("r", 5).style("fill", "red")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 15).attr("r", 5).style("fill", "blue")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 30).attr("r", 5).style("fill", "yellow")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 45).attr("r", 5).style("fill", "green")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 60).attr("r", 5).style("fill", "orange")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 75).attr("r", 5).style("fill", "purple")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 90).attr("r", 5).style("fill", "pink")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 105).attr("r", 5).style("fill", "gray")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 120).attr("r", 5).style("fill", "brown")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 135).attr("r", 5).style("fill", "lightgreen")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 150).attr("r", 5).style("fill", "magenta")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 165).attr("r", 5).style("fill", "cyan")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top).text("Sport").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 15).text("Platformer").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 30).text("Racing").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 45).text("RPG").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 60).text("Shooter").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 75).text("Simulation").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 90).text("Action").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 105).text("Fighting").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 120).text("Adventure").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 135).text("Strategy").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 150).text("Misc").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 165).text("Puzzle").style("font-size", "15px").attr("alignment-baseline","middle")

  // svg.append("circle").attr("cx",width + 20).attr("cy", margin.top).attr("r", 5).style("fill", "red")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 15).attr("r", 5).style("fill", "blue")
  // svg.append("circle").attr("cx",width + 20).attr("cy",margin.top + 30).attr("r", 5).style("fill", "green")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top).text("Nintendo").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 15).text("Sony").style("font-size", "15px").attr("alignment-baseline","middle")
  // svg.append("text").attr("x", width + 30).attr("y", margin.top + 30).text("Microsoft").style("font-size", "15px").attr("alignment-baseline","middle")

  // Add X axis
  var x = d3.scaleSymlog()
    .domain(d3.extent(platformed_data, function(d) { return +d["NA_Sales"] }))
    .range([ 0, width ]);

  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var xLabel = svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", (width + margin.right + margin.left) / 2)
    .attr("y", height + 40)
    .text("North America Sales (Millions)");

  // Add Y axis
  var y = d3.scaleSymlog()
    .domain(d3.extent(platformed_data, function(d) { return +d["EU_Sales"] }))
    .range([ height, 0]);

  var yAxis = svg.append("g")
    .call(d3.axisLeft(y));

  var yLabel = svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -(height - margin.top - margin.bottom - 50) / 2)
    .attr("y", -50)
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
  const mouseout = function() {
    d3.select(this).transition()
      .duration('200')
      .attr("r", 5);
    tooltip
      .transition()
      .duration(200)
      .style("visibility", "hidden")
  }

  // Add a clipPath: everything out of this area won't be drawn.
  var clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width + 5 )
      .attr("height", height + 5)
      .attr("x", -1)
      .attr("y", -4);

  // Create the scatter variable: where both the circles and the brush take place
  var scatter = svg.append('g')
    .attr("clip-path", "url(#clip)")

  // Add circles
  scatter
    .selectAll("circle")
    .data(platformed_data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(+d["NA_Sales"]); } )
    .attr("cy", function (d) { return y(+d["EU_Sales"]); } )
    .attr("r", 5)
    .style("fill", function (d) {
      if (nintendo.includes(d.Platform)) {
        return color("Nintendo")
      }
      else if (sony.includes(d.Platform)) {
        return color("Sony")
      }
      else {
        return color("Microsoft")
      }
    })
    .style("padding", "10px")
    .attr("stroke", "#000000")
    .attr("stroke-width", "1.5")
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

  // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
  var zoom = d3.zoom()
      .scaleExtent([1, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", function (e) { updateChart(e, "NA_Sales", "EU_Sales") });

  // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
  var zoomZone = svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .lower()
      .call(zoom);

  // now the user can zoom and it will trigger the function called updateChart

  // A function that updates the chart when the user zoom and thus new boundaries are available
  function updateChart(event, xRegion, yRegion) {

    // recover the new scale
    var newX = event.transform.rescaleX(x);
    var newY = event.transform.rescaleY(y);

    // update axes with these new boundaries
    xAxis.call(d3.axisBottom(newX))
    yAxis.call(d3.axisLeft(newY))

    // update circle position
    scatter
      .selectAll("circle")
      .attr('cx', function(d) {return newX(d[xRegion])})
      .attr('cy', function(d) {return newY(d[yRegion])});
  }

  if(region === "naveu"){
    let xRegion = "NA_Sales"
    let yRegion = "EU_Sales"

    x.domain(d3.extent(platformed_data.map(function(d){return +d[xRegion]}), s => +s))
    y.domain(d3.extent(platformed_data.map(function(d){return +d[yRegion]}), s => +s))

    xLabel
      .text("North America Sales (Millions)")
    yLabel
      .text("Europe Sales (Millions)")

    scatter.transition()
      .duration('1000')
      .selectAll("circle")
      .attr("cx", function (d) { return x(+d[xRegion]); } )
      .attr("cy", function (d) { return y(+d[yRegion]); } )
      .attr("r", 5)
      .style("fill", function (d) {
        if (nintendo.includes(d.Platform)) {
          return color("Nintendo")
        }
        else if (sony.includes(d.Platform)) {
          return color("Sony")
        }
        else {
          return color("Microsoft")
        }
      })
      .style("padding", "10px")
      .attr("stroke", "#000000")
      .attr("stroke-width", "1.5")

    xAxis.call(d3.axisBottom(x))
    yAxis.call(d3.axisLeft(y))

    zoom
      .on("zoom", function (e) { updateChart(e, xRegion, yRegion) });
  }
  if(region === "navjp") {
    let xRegion = "NA_Sales"
    let yRegion = "JP_Sales"

    x.domain(d3.extent(platformed_data.map(function(d){return d[xRegion]}), s => +s))
    y.domain(d3.extent(platformed_data.map(function(d){return d[yRegion]}), s => +s))

    xLabel
      .text("North America Sales (Millions)")
    yLabel
      .text("Japan Sales (Millions)")


    scatter.transition()
      .duration('1000')
      .selectAll("circle")
      .attr("cx", function (d) { return x(+d[xRegion]); } )
      .attr("cy", function (d) { return y(+d[yRegion]); } )
      .attr("r", 5)
      .style("fill", function (d) {
        if (nintendo.includes(d.Platform)) {
          return color("Nintendo")
        }
        else if (sony.includes(d.Platform)) {
          return color("Sony")
        }
        else {
          return color("Microsoft")
        }
      })
      .style("padding", "10px")
      .attr("stroke", "#000000")
      .attr("stroke-width", "1.5")

    xAxis.call(d3.axisBottom(x))
    yAxis.call(d3.axisLeft(y))

    zoom
      .on("zoom", function (e) { updateChart(e, xRegion, yRegion) });
  }

  if(region === "euvjp"){
    let xRegion = "EU_Sales"
    let yRegion = "JP_Sales"

    x.domain(d3.extent(platformed_data.map(function(d){return d[xRegion]}), s => +s))
    y.domain(d3.extent(platformed_data.map(function(d){return d[yRegion]}), s => +s))

    xLabel
      .text("Europe Sales (Millions)")
    yLabel
      .text("Japan Sales (Millions)")


    scatter.transition()
      .duration('1000')
      .selectAll("circle")
      .attr("cx", function (d) { return x(+d[xRegion]); } )
      .attr("cy", function (d) { return y(+d[yRegion]); } )
      .attr("r", 5)
      .style("fill", function (d) {
        if (nintendo.includes(d.Platform)) {
          return color("Nintendo")
        }
        else if (sony.includes(d.Platform)) {
          return color("Sony")
        }
        else {
          return color("Microsoft")
        }
      })
      .style("padding", "10px")
      .attr("stroke", "#000000")
      .attr("stroke-width", "1.5")

    xAxis.call(d3.axisBottom(x))
    yAxis.call(d3.axisLeft(y))

    zoom
      .on("zoom", function (e) { updateChart(e, xRegion, yRegion) });
  }

}


const Scatterplot = (props) => {
  const [regions, setRegions] = useState("naveu")
  const handleChange = (event) => {
    setRegions(event.target.value)
  }

  var div = d3.select("#my_dataviz");
  div.selectAll("*").remove();
  drawChart(props.dataset, props.platforms, regions, props.filterPlat)

  return (
      <div>
        <h3 id="chart-title"></h3>
        <div id="my_dataviz"></div>
          <div style={{ display: "flex", justifyContent: "center", marginRight : "100px"}}>
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
            <button id="Reset">Reset Zoom</button>
          </div>
      </div>
    )
}

export default  Scatterplot;
