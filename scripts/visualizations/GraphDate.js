var d3 = require('d3/d3');

var GraphBackground = {};

var height = 6;
var padding = {top: 10, left: 15};
var duration = 500;

GraphBackground.enter = (selection) => {
  selection.select('rect')
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .attr('y', (d) => -d.height / 2)
    .attr('opacity', .3)
    .attr('fill', (d) => d.fill);

  selection.select('text.date')
    .attr('x', padding.left)
    .attr('dy', '.35em')
    .attr('text-anchor', 'start')
    .attr('fill', '#0B486B')
    .style('font-weight', 600);

  selection.attr('transform', (d) => {
    return 'translate(0,' + d.y + ')';
  });
}

GraphBackground.update = (selection) => {
  selection.select('rect')
    .transition().duration(duration)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .attr('y', (d) => -d.height / 2);

  selection.transition().duration(duration)
    .attr('transform', (d) => {
      return 'translate(0,' + d.y + ')';
    });
}

GraphBackground.exit = () => {

}

GraphBackground.onMouseEnter = (selection) => {
  selection.select('rect')
    .attr('fill', '#cfcfcf');
}

GraphBackground.onMouseLeave = (selection) => {
  selection.select('rect')
    .attr('fill', (d) => d.fill);
}

module.exports = GraphBackground;