var d3 = require('d3/d3');

var GraphBackground = {};

var height = 6;
var padding = {top: 10, left: 15};
var duration = 500;

GraphBackground.enter = (selection) => {
  selection.select('rect')
    .attr('width', 0)
    .attr('height', height)
    .attr('x', (d) => d.x)
    .attr('y', -height / 2)
    .attr('opacity', .3)
    .attr('fill', '#0B486B');

  selection.select('text.date')
    .attr('x', padding.left)
    .attr('dy', '.35em')
    .attr('text-anchor', 'start')
    .attr('fill', '#0B486B')
    .style('font-weight', 600);

  selection.select('text.total')
    .attr('x', (d) => d.x + (d.width ? padding.left : 0))
    .attr('dy', '.3em')
    .attr('text-anchor', 'start')
    .attr('fill', '#0B486B')
    .attr('opacity', 0)
    .style('font-weight', 600);

  selection.attr('transform', (d) => {
    return 'translate(0,' + d.y + ')';
  });
}

GraphBackground.update = (selection) => {
  selection.select('rect')
    .transition().duration(duration)
    .attr('width', (d) => d.width ? d.width - d.x : 0);

  selection.select('text.total')
    .transition().duration(duration)
    .attr('opacity', .3)
    .attr('x', (d) => d.width ? (d.width + padding.left) : d.x);

  selection.transition().duration(duration)
    .attr('transform', (d) => {
      return 'translate(0,' + d.y + ')';
    });
}

GraphBackground.exit = () => {

}

module.exports = GraphBackground;