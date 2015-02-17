var d3 = require('d3/d3');

var CategoryVisualization = {};

CategoryVisualization.enter = (selection) => {
  selection.select('circle')
    .attr('r', 0)
    .attr('fill', (d) => d.fill)
    .attr('fill-opacity', .5)
    .attr('stroke', (d) => d.fill)
    .attr('stroke-width', 0);
  
  selection.call(CategoryVisualization.update);
}

CategoryVisualization.update = (selection) => {
  selection.select('circle')
    .transition().duration(500)
    .attr('r', (d) => d.size)
    .attr('stroke-width', 2);
}

CategoryVisualization.exit = () => {

}

CategoryVisualization.position = (selection) => {
  selection.attr('transform', 'translate(50, 50)');
}

module.exports = CategoryVisualization;