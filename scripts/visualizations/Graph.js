var d3 = require('d3/d3');
var ExpenseVisualization = require('./Expense');
var ExpenseBarVisualization = require('./ExpenseBar');

GraphVisualization = {};

GraphVisualization.enter = (selection) => {
}

GraphVisualization.update = (selection) => {
  selection.selectAll('.expenseBar')
    .call(ExpenseBarVisualization.update);

  selection.selectAll('.expense')
    .call(ExpenseVisualization.update);
}

GraphVisualization.exit = () => {
}

module.exports = GraphVisualization;