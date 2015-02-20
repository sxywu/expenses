var _ = require('lodash');
var d3 = require('d3/d3');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var GraphStore = require('../stores/GraphStore');

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

/** Takes the categories and expenses to be rendered (nodes)
* and calculates the links between them
* @param {Array} categories As returned by calculateCategories
* @param {Array} expenses As returned by calculateExpenses
* @return {Array} links between expenses and categories
*/
GraphCalculationUtils.calculateLinks = (categories, expenses) => {
  var links = [];
  _.each(expenses, (expense) => {
    // for each of the expenses, link it to the categories it belongs to
    var source = expense;
    _.each(ExpenseStore.get(expense.id).categories, (categoryId) => {
      var target = _.find(categories, (category) => category.id === categoryId);
      if (target) {
        links.push({source, target});
      }
    });
  });

  return links;
};

GraphCalculationUtils.calculateUpdate = (prev, next) => {
  _.each(next.categories, (category) => {
    var prevCategory = _.find(prev.categories, (prevCategory) => prevCategory.id === category.id);
    if (prevCategory) {
      delete prevCategory.update;
      // if there was previously the same category, and some update has happened
      category.update = !_.isEqual(prevCategory, category);
    }
  });
  _.each(next.expenses, (expense) => {
    var prevExpense = _.find(prev.expenses, (prevExpense) => prevExpense.id === expense.id);
    if (prevExpense) {
      delete prevExpense.update;
      expense.update = !_.isEqual(prevExpense, expense);
    }
  });
}

var force = d3.layout.force()
  .linkDistance(75)
  .charge((d) => -Math.pow(d.size, 2))
  .size([500, 500]);
GraphCalculationUtils.positionGraph = (categories, expenses, links) => {
  var positions = GraphStore.getPositions();
  // first apply any positions that have been saved
  var nodes = _.union(categories, expenses);
  _.each(nodes, (node) => {
    if (!positions[node.id]) return;
    node.fixed = true;
    node.x = positions[node.id].x;
    node.y = positions[node.id].y;
  });

  force.nodes(nodes)
    .links(links)
    .start();
  _.each(_.range(1000), () => force.tick());
  force.stop();
  _.each(nodes, (node) => cleanNodeAfterForceCalculation(node));
};

function cleanNodeAfterForceCalculation(node) {
  delete node.index;
  delete node.px;
  delete node.py;
  delete node.weight;
}

module.exports = GraphCalculationUtils;