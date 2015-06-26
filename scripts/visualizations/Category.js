var d3 = require('d3/d3');

var CategoryVisualization = {};
var duration = 500;
var margin = {top: 12, left: 5};
var padding = {top: 5, left: 5};

CategoryVisualization.enter = (selection) => {
  selection.select('circle.back')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 0)
    .attr('fill', '#fff');

  selection.select('circle.front')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 0)
    .attr('fill-opacity', .25)
    .attr('stroke-width', 0);

  selection.select('rect')
    .attr('opacity', 0)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('fill', '#fafafa');

  selection.select('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .attr('opacity', 0);
  
  selection
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

  selection.call(CategoryVisualization.update);
}

CategoryVisualization.update = (selection) => {
  selection.select('circle.back')
    .transition().duration((d) => !d.expenseBeingDragged ? duration : 0)
    .attr('r', (d) => d.size)

  selection.select('circle.front')
    .transition().duration((d) => !d.expenseBeingDragged ? duration : 0)
    .attr('r', (d) => d.size)
    .attr('fill', (d) => d.fill)
    .attr('stroke', (d) => d.fill)
    .attr('fill-opacity', (d) => {
      return d.selected || d.highlighted ? .75 : .15;
    }).attr('stroke-opacity', (d) => {
      return d.selected || d.highlighted ? 1 : .35;
    }).attr('stroke-width', 3);

  selection.select('text')
    .each(function(d) {
      d.textWidth = this.getBBox().width + padding.left * 2;
      d.textHeight = this.getBBox().height + padding.top;
    }).transition().duration((d) => !d.expenseBeingDragged ? duration : 0)
    .attr('y', (d) => d.size + margin.top)
    .attr('opacity', (d) => {
      return d.selected || d.highlighted ? 1 : .5;
    }).attr('fill', (d) => d.fill);

  selection.select('rect')
    .transition().duration((d) => !d.expenseBeingDragged ? duration : 0)
    .attr('opacity', .75)
    .attr('width', (d) => d.textWidth)
    .attr('height', (d) => d.textHeight)
    .attr('x', (d) => -d.textWidth / 2)
    .attr('y', (d) => d.size + margin.top - d.textHeight / 2);

  selection
    .transition().duration((d) => !d.expenseBeingDragged ? duration : 0)
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
}

CategoryVisualization.exit = () => {

}

module.exports = CategoryVisualization;