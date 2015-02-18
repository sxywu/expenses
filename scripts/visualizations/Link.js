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
    .attr('stroke', '#333');

  selection.call(LinkVisualization.update);
}

LinkVisualization.update = (selection) => {
  selection
    .transition().duration(duration)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y);
}

LinkVisualization.exit = () => {

}

module.exports = LinkVisualization;