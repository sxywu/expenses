var d3 = require('d3/d3');

var GraphBackground = {};

var height = 5;
var padding = {top: 10, left: 10};
GraphBackground.enter = (selection) => {
  selection.select('rect')
    .attr('width', (d) => d.width)
    .attr('height', height)
    .attr('y', -height / 2)
    .attr('fill', '#efefef');

  selection.select('text')
    .attr('x', (d) => d.x - padding.left)
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .style('font-weight', 600);

  selection.attr('transform', (d) => {
    return 'translate(0,' + d.y + ')';
  });
}

GraphBackground.update = (selection) => {
  selection.select('text')
    .text((d) => d.formattedDate);
}

GraphBackground.exit = () => {

}

module.exports = GraphBackground;