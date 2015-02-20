var d3 = require('d3/d3');

var ExpenseVisualization = {};
var duration = 750;
var margin = {top: 10, left: 5};

ExpenseVisualization.enter = (selection) => {
  selection.select('rect')
    .attr('x', (d) => -d.size / 2)
    .attr('y', (d) => -d.size / 2)
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('width', 0)
    .attr('height', 0)
    .attr('fill', '#fff')
    .attr('stroke', '#333')
    .attr('stroke-width', 0);

  selection.select('text')
    .attr('text-anchor', 'middle')
    .attr('y', (d) => d.size / 2 + margin.top)
    .attr('dy', '.35em')
    .attr('opacity', 0);
  
  selection
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

  selection.call(ExpenseVisualization.update);
}

ExpenseVisualization.update = (selection) => {
  selection.select('rect')
    .transition().duration(duration)
    .attr('width', (d) => d.size)
    .attr('height', (d) => d.size)
    .attr('stroke-width', 2);

  selection.select('text')
    .transition().duration(duration)
    .attr('opacity', 1)
    .text((d) => d.name);

  selection
    .transition().duration((d) => {
      return d.drag ? 0 : duration;
    }).attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
}

ExpenseVisualization.exit = () => {

}

ExpenseVisualization.drag = (selection, onDrag) => {
  var drag = d3.behavior.drag()
    .on('drag', () => {
      onDrag(d3.event.x, d3.event.y);
    });

  selection.call(drag);
}

module.exports = ExpenseVisualization;