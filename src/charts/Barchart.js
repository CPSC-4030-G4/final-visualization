import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as tip from 'd3-tip'
import {MenuItem , FormControl, Select, InputLabel} from '@mui/material'

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

const drawChart =(dataset, publisher, region, filterFunc, setFilterData, filterPlat) => {
  const margin = {top: 70, right: 30, bottom: 65, left: 100},
    width = 500 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;
  
  const nintendo = ['Wii', 'GBA', 'GB', 'DS', 'SNES', 'NES', 'WiiU', '3DS', 'GC', 'N64']
  const playstation = ['PS2', 'PS3', 'PSV', 'PSP', 'PS', 'PS4']
  const microsoft = ['XB', 'X360', 'XOne']
  let platforms = []
  let choice = publisher.toLowerCase()
  
  let color = ""
  
  let sales_map = {}
  
  if(choice === 'nintendo') {
  platforms = nintendo
  color = "#e4000f"
  }
  else if(choice === 'sony') {
  platforms = playstation
  color = "#003087"
  }
  else {
  platforms = microsoft
  color = '#107C10'
  }
  
  platforms.forEach(element => sales_map[element] = 0);
    
  // append the svg object to the body of the page
  const svg = d3.select("#bar-graph")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .text("life expectancy (years)")
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

svg.append("text")
                .attr("x", -15)
                .attr("y", -30)
                .attr("text-anchor", "left")
                .style("font-size", "24px")
                .style("fill", "black")
                .style("max-width", 400)
                .text("Sales of Games on System by Publisher")
  
  // // Parse the Data
  const data = dataset.filter((d) => d[region] !== 'N/A')
  const platformed_data = data.filter((d)=> {
    return platforms.includes(d['Platform'])
  })
  
  
  platformed_data.forEach( d => {
    sales_map[d['Platform']] += +d[region]
  });
  
  const sales = Object.values(sales_map)
  
  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(platformed_data.map(d => d['Platform']))
  .padding(0.2);
  
  
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
  
    svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width / 1.5)
            .attr("y", height + 50)
            .text(`Systems developed by ${publisher}`)
            .attr("fill", "black")

    // svg.append("circle").attr("cx",width - 50).attr("cy", margin.top).attr("r", 5).style("fill", "red")
    // svg.append("circle").attr("cx",width - 50).attr("cy",margin.top + 15).attr("r", 5).style("fill", "blue")
    // svg.append("circle").attr("cx",width - 50).attr("cy",margin.top + 30).attr("r", 5).style("fill", "green")
    // svg.append("text").attr("x", width - 40).attr("y", margin.top).text("Nintendo").style("font-size", "15px").attr("alignment-baseline","middle")
    // svg.append("text").attr("x", width - 40).attr("y", margin.top + 15).text("Sony").style("font-size", "15px").attr("alignment-baseline","middle")
    // svg.append("text").attr("x", width - 40).attr("y", margin.top + 30).text("Microsoft").style("font-size", "15px").attr("alignment-baseline","middle")

  const y = d3.scaleLinear()
  .domain([0, d3.max(sales)])
  .range([ height, 0]);
  svg.append("g")
  .call(d3.axisLeft(y));
  
  svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("x", -(height) / 3)
  .attr("y", -50)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .attr("fill", "black")
  .text( function () {
    switch(region) {
      case "Global_Sales":
        return "Global Sales (Millions)"
      case "NA_Sales":
        return "North America Sales (Millions)"
      case "EU_Sales":
        return "Europe Sales (Millions)"
      case "JP_Sales":
        return "Japan Sales (Millions)"
      default:
        return "Invalid Region"
    }
  })
  
  const tooltip = d3.select("#bar-graph")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
    
      /* Invoke the tip  in the context of your visualization */
      const mouseover = function(event, d) {
      tooltip
        .style("opacity", 1)
      const platform = platformed_data.filter((d) => d.Platform === event.target.__data__.Platform)
      if (platform !== filterPlat) {
        d3.select(this)
          .style("stroke", "black")
          .style("stroke-width", 2)
          .style("opacity", 1)
      }
    }
    const mousemove = function(event,d) {
      const platform = platformed_data.filter((d) => d.Platform === event.target.__data__.Platform)
      const sorted = platform.sort((a,b) => b.Global_Sales - a.Global_Sales)
      tooltip
        .html(`Top Selling ${d['Platform']} game: ${sorted[0].Name}` + "<br/>" + `$ ${(+sales_map[d['Platform']] * 1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
        .style("left", (event.x)/2 + "px")
        .style("top", (event.y)/2 + "px")
        .attr("fill", "black")
    }
    const mouseleave = function(event,d) {
      tooltip
        .style("opacity", 0)
      const platform = platformed_data.filter((d) => d.Platform === event.target.__data__.Platform)
      if (platform !== filterPlat) {
        d3.select(this)
          .style("stroke", "none")
          .style("stroke-width", 2)
          .style("opacity", 0.8)
      }
    }

  svg.selectAll("bar")
  .data(platformed_data)
  .join("rect")
    .attr("x", d => x(d['Platform']))
    .attr("y", d => y(+sales_map[d['Platform']]))
    .attr("width", x.bandwidth())
    .attr("height", d => {
     return height - y(+sales_map[d['Platform']])
    })
    .attr("fill", color)
    .attr("stroke", d => {
      if (d['Platform'] === filterPlat) {
        return "black"
      }
      else {
        return "none"
      }
    })
    .attr("stroke-width", d => {
      if (d['Platform'] === filterPlat) {
        return 4
      }
      else {
        return 2
      }
    })
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .on('click', (event, d) => {
      const platform = platformed_data.filter((d) => d.Platform === event.target.__data__.Platform)
      const sorted = platform.sort((a,b) => b.Global_Sales - a.Global_Sales)
      if (filterPlat === platform) {
        filterFunc(null)
        setFilterData([])
        d3.select(this)
          .style("stroke", "black")
          .style("stroke-width", 2)
          .style("opacity", 1)
      }
      else {
        filterFunc(sorted[0].Platform)
        setFilterData(dataset.filter(d => d.Platform === sorted[0].Platform))
        d3.select(this)
          .style("stroke", "black")
          .style("stroke-width", 4)
          .style("opacity", 1)

      }

    })
  }

const Barchart = (props) => {
  var div = d3.select("#bar-graph");
  div.selectAll("*").remove();
   initChart(460, 400)
   drawChart(props.dataset, props.publisher, props.region, props.filterFunc, props.filterDataFunc, props.filterPlat)

 return (
 <div>
    <h3 id="chart-title"></h3>
    <div id="bar-graph"> 
    </div>
 </div>
 )
}

export default Barchart