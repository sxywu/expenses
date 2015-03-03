var d3 = require('d3/d3');

var CategoryVisualization = {};
var duration = 750;
var margin = {top: 12, left: 5};

CategoryVisualization.enter = (selection) => {
  selection.select('circle.back')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 0)
    .attr('fill', '#fff');

  selection.select('circle.front')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 0)
    .attr('fill-opacity', .25)
    .attr('stroke-width', 0);

  selection.select('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .attr('opacity', 0);
  
  selection
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

  selection.call(CategoryVisualization.update);
}

CategoryVisualization.update = (selection) => {
  selection.select('circle.back')
    .transition().duration(duration)
    .attr('r', (d) => d.size)

  selection.select('circle.front')
    .transition().duration(duration)
    .attr('r', (d) => d.size)
    .attr('fill', (d) => d.fill)
    .attr('stroke', (d) => d.fill)
    .attr('fill-opacity', (d) => {
      return d.selected ? .75 : (d.highlighted ? .5 : .25);
    }).attr('stroke-opacity', (d) => {
      return d.selected ? 1 : (d.highlighted ? .75 : .5);
    }).attr('stroke-width', 3);

  selection.select('text')
    .transition().duration(duration)
    .attr('y', (d) => d.size + margin.top)
    .attr('opacity', 1)
    .attr('fill', (d) => d.fill)
    .text((d) => d.name);

  selection
    .transition().duration(duration)
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
}

CategoryVisualization.exit = () => {

}

module.exports = CategoryVisualization;