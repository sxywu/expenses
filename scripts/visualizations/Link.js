var d3 = require('d3/d3');

var LinkVisualization = {};
var duration = 750;

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
    .transition().duration((d) => {
      return d.source.drag || d.target.drag ? 0 : duration;
    }).attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y)
    .attr('stroke-opacity', (d) => {
      return d.source.selected || d.target.selected ? 1 : .25;
    });
}

LinkVisualization.exit = () => {

}

module.exports = LinkVisualization;