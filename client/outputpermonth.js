import {d3} from 'd3'

// set the dimensions and margins of the graph
const margin2 = {top: 50, right: 20, bottom: 50, left: 50},
  width2 = 460 - margin2.left - margin2.right,
  height2 = 400 - margin2.top - margin2.bottom

// append the svg object to the body of the page
const svg2 = d3
  .select('/data/output_per_month.csv')
  .append('svg')
  .attr('width', width2 + margin2.left + margin2.right)
  .attr('height', height2 + margin2.top + margin2.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

//Read the data
d3.csv(
  '/data/output_per_month.csv',

  // When reading the csv, I must format variables:
  function(d) {
    return {date: d.date, value: d.value}
  },

  // Now I can use this dataset:
  function(data) {
    // Add X axis --> it is a date format
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function(d) {
          return d.Month
        })
      )
      .range([0, width2])
    svg2
      .append('g')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(d3.axisBottom(x))

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function(d) {
          return +d.Output
        })
      ])
      .range([height2, 0])
    svg2.append('g').call(d3.axisLeft(y))

    // Add the area
    svg2
      .append('path')
      .datum(data)
      .attr('fill', '#4682b4')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .area()
          .x(function(d) {
            return x(d.Month)
          })
          .y0(y(0))
          .y1(function(d) {
            return y(d.Output)
          })
      )
  }
)
