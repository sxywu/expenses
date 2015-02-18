var _ = require('lodash');
var d3 = require('d3/d3');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');

var GraphCalculationUtils = {};

/** Gets info from CategoryStore and calculates data
* to render with, such as name, fill, size, etc.
* @return {Array} Array of renderable category objects
*/
var colorScale = d3.scale.category10();
GraphCalculationUtils.calculateCategories = () => {
  var categories = CategoryStore.getAll();
  return _.map(categories, (category) => {
    var expenses = ExpenseStore.getAll();
    // to get the size of the category, get all the expenses
    // that are in the category, and add um their amounts
    var size = _.chain(expenses)
      .filter((expense) => _.contains(expense.categories, category.id))
      .reduce((memo, expense) => {
        return memo + expense.amount;
      }, 0).value();

    return {
      id: category.id,
      name: category.name,
      fill: colorScale(category.name),
      size: size * 5 || 10 // default to 10 if size is 0
    }
  });
};

GraphCalculationUtils.calculateExpenses = () => {
  var expenses = ExpenseStore.getAll();
  return _.map(expenses, (expense) => {
    return {
      id: expense.id,
      name: expense.name,
      size: expense.amount * 5
    };
  });
};

var force = d3.layout.force()
  .charge((d) => -Math.pow(d.size, 2) / 4)
  .size([500, 500]);
GraphCalculationUtils.positionGraph = (categories, expenses) => {
  force.nodes(_.union(categories, expenses));
  force.start();
  _.each(_.range(1000), () => force.tick());
  force.stop();
};

module.exports = GraphCalculationUtils;