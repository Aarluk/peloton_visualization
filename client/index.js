import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom
} from "d3" 

//First graph
const svg1 = select('svg')
const width = +svg1.attr('width')
const height = +svg1.attr('height')

//GRAPH 1 - Make one rectangle for each row and append rectangles to our svg element
const render = data => {
  //create value accessors
  const xValue = d => d.Output
  const yValue = d => d.Instructor
  const margin = {top: 5, right: 20, bottom: 55, left: 200}
  const innerWidth = width - margin.left
  const innerHeight = height - margin.top - margin.bottom

  const xScale = scaleLinear() //creates an instance of the d3 linear scale
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])
  // console.log(xScale.range())

  //give name to x axis
  const xAxis = axisBottom(xScale)
  .tickSize(-innerHeight)

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.3)
  // console.log(yScale.domain())

  //give name to y axis
  const yAxis = axisLeft(yScale)

  //add margin (left, right, top and/or bottom)
  const g = svg1
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.right})`)

  g.append('g').call(yAxis) // append a new group element and put the y axis
  g
    .append('g')
    .call(xAxis) // append a new group element and put the x axis
    .attr('transform', `translate(0, ${innerHeight})`)

  g
    .selectAll('rect')
    .data(data) // then make a d3 data join
    .enter()
    .append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('width', d => xScale(xValue(d)))
    .attr('height', yScale.bandwidth())

}

//Represent a data table in Javascript - GRAPH 1
csv('/data/output_instructor.csv').then(data => {
  data.forEach(d => {
    d.Output = +d.Output
  })
  //Create rectangles for each row
  render(data)
})


