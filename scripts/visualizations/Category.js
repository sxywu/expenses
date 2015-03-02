var d3 = require('d3/d3');

var CategoryVisualization = {};
var duration = 750;
var margin = {top: 10, left: 5};

CategoryVisualization.enter = (selection) => {
  selection.select('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 0)
    .attr('fill-opacity', .5)
    .attr('stroke-width', 0);

  selection.select('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .attr('y', (d) => d.size + margin.top)
    .attr('opacity', 0);
  
  selection
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

  selection.call(CategoryVisualization.update);
}

CategoryVisualization.update = (selection) => {
  selection.select('circle')
    .transition().duration(duration)
    .attr('r', (d) => d.size)
    .attr('fill', (d) => d.fill)
    .attr('stroke', (d) => d.fill)
    .attr('stroke-width', 2);

  selection.select('text')
    .transition().duration(duration)
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