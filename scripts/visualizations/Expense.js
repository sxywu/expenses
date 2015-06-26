var d3 = require('d3/d3');

var ExpenseVisualization = {};
var duration = 250;
var margin = {top: 10, left: 5};
var padding = {top: 5, left: 5};

ExpenseVisualization.enter = (selection) => {
  selection.select('rect.expenseRect')
    .attr('x', (d) => -d.size / 2)
    .attr('y', (d) => -d.size / 2)
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('width', (d) => d.size)
    .attr('height', (d) => d.size)
    .attr('fill', '#fafafa')
    .attr('stroke', '#0B486B')
    .attr('stroke-opacity', (d) => {
      return d.selected || d.highlighted ? 1 : .5;
    }).attr('stroke-width', 2);

  selection.select('rect.textBG')
    .attr('opacity', .75)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('fill', '#fafafa');

  selection.select('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .attr('opacity', (d) => {
      return d.selected || d.highlighted ? 1 : .5;
    });
  
  selection
    .attr('opacity', 0)
    .attr('transform', (d) => 'translate(' + d.x1 + ',' + d.y + ')');
}

ExpenseVisualization.update = (selection) => {
  selection.select('rect.expenseRect')
    .transition().delay((d, i) => d.order * duration)
    .duration(duration)
    .attr('width', (d) => d.size)
    .attr('height', (d) => d.size)
    .attr('stroke-opacity', (d) => {
      return d.selected || d.highlighted ? 1 : .5;
    });

  selection.select('text')
    .each(function(d) {
      d.textWidth = this.getBBox().width + padding.left * 2;
      d.textHeight = this.getBBox().height + padding.top;
    }).transition().delay((d, i) => d.order * duration)
    .duration(duration)
    .attr('y', (d) => d.size / 2 + margin.top)
    .attr('opacity', (d) => {
      return d.selected || d.highlighted ? 1 : .5;
    });

  selection.select('rect.textBG')
    .transition().delay((d, i) => d.order * duration)
    .duration(duration)
    .attr('width', (d) => d.textWidth)
    .attr('height', (d) => d.textHeight)
    .attr('x', (d) => -d.textWidth / 2)
    .attr('y', (d) => d.size / 2 + margin.top - d.textHeight / 2);

  selection
    .transition().delay((d, i) => d.order * duration)
    .duration((d) => {
      return d.expenseBeingDragged ? 0 : duration;
    }).attr('opacity', 1)
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
}

ExpenseVisualization.exit = () => {

}

ExpenseVisualization.drag = (selection, beforeDrag, onDrag, afterDrag) => {
  var draggable = false;
  var drag = d3.behavior.drag()
    .on('dragstart', () => {
      setTimeout(() => {
        draggable = true;
      }, duration);
      beforeDrag();
    }).on('drag', () => {
      if (!draggable) return;
      onDrag(d3.event.x, d3.event.y);
    }).on('dragend', () => {
      draggable = false;
      afterDrag();
    });

  selection.call(drag);
}

module.exports = ExpenseVisualization;