var d3 = require('d3/d3');

var LinkVisualization = {};
var duration = 500;

LinkVisualization.enter = (selection) => {
  selection
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.source.x)
    .attr('y2', (d) => d.source.y)
    .attr('fill', 'none')
    .attr('stroke', '#0B486B');

  selection.call(LinkVisualization.update);
}

LinkVisualization.update = (selection) => {
  selection
    .transition().duration((d) => !d.expenseBeingDragged ? duration : 0)
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y)
    .attr('stroke-opacity', (d) => {
      return d.source.selected || d.target.selected ? 1 : .05;
    });
}

LinkVisualization.exit = () => {

}

module.exports = LinkVisualization;