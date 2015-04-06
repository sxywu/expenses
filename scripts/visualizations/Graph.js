var d3 = require('d3/d3');
var ExpenseVisualization = require('./Expense');

GraphVisualization = {};

GraphVisualization.enter = (selection) => {
}

GraphVisualization.update = (selection) => {
  selection.selectAll('.expense')
    .call(ExpenseVisualization.update);
}

GraphVisualization.exit = () => {
}

module.exports = GraphVisualization;