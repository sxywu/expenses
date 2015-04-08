var d3 = require('d3/d3');

var ExpenseBarVisualization = {};
var duration = 250;
var margin = {top: 10, left: 5};
var padding = {top: 5, left: 5};

ExpenseBarVisualization.enter = (selection) => {
  selection
    .attr('x', (d) => d.x1)
    .attr('y', (d) => d.y -d.size / 4)
    .attr('width', 0)
    .attr('height', (d) => d.size / 2)
    .attr('fill', '#cfcfcf');
}

ExpenseBarVisualization.update = (selection) => {
  selection
    .transition().delay((d, i) => d.order * duration)
    .duration((d) => {
      return d.drag ? 0 : duration;
    }).attr('x', (d) => d.x1)
    .attr('width', (d) => d.x - d.x1);
}

ExpenseBarVisualization.exit = () => {

}

module.exports = ExpenseBarVisualization;