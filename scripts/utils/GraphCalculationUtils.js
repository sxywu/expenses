var _ = require('lodash');
var d3 = require('d3/d3');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var GraphStore = require('../stores/GraphStore');
var SelectionStore = require('../stores/SelectionStore');

var GraphCalculationUtils = {};

/** Gets info from CategoryStore and calculates data
* to render with, such as name, fill, size, etc.
* @return {Array} Array of renderable category objects
*/
var colorScale = d3.scale.category10();
GraphCalculationUtils.calculateCategory = (category) => {
  // (I really shouldn't be getting all expenses every time...)
  var expenses = ExpenseStore.getAll();
  // to get the size of the category, get all the expenses
  // that are in the category, and add um their amounts
  var total = _.chain(expenses)
    .filter((expense) => _.contains(expense.categories, category.id))
    .reduce((memo, expense) => {
      return memo + expense.amount;
    }, 0).value();

  return {
    id: category.id,
    name: category.name,
    fill: colorScale(category.name),
    total: total
  }
};
GraphCalculationUtils.calculateCategories = () => {
  var categories = CategoryStore.getAll();
  return _.map(categories, (category) => {
    return GraphCalculationUtils.calculateCategory(category);
  });
};

var dateFormat = d3.time.format('%m/%d');
GraphCalculationUtils.calculateExpenses = () => {
  var expenses = ExpenseStore.getAll();
  return _.map(expenses, (expense) => {
    return {
      id: expense.id,
      name: expense.name,
      size: 10
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

GraphCalculationUtils.highlightSelections = (selection, categories, expenses) => {
  if (!selection) return;

  if (selection.type === 'category') {
    var category = _.find(categories, (category) => category.id === selection.id);
    if (category) {
      category.selected = true;
      _.each(expenses, (expense) => {
        var exp = ExpenseStore.get(expense.id);
        if (_.contains(exp.categories, selection.id)) {
          expense.highlighted = true;
        }
      });
    }
  } else if (selection.type === 'expense') {
    var expense = _.find(expenses, (expense) => expense.id === selection.id);
    if (expense) {
      expense.selected = true;
      _.each(ExpenseStore.get(expense.id).categories, (categoryId) => {
        var category = _.find(categories, (category) => category.id === categoryId);
        category.highlighted = true;
      });
    }
  }
}

var categoryScale = d3.scale.linear().range([7.5, 50]);
GraphCalculationUtils.calculateSizes = (categories) => {
  var min = _.min(categories, (category) => category.total).total;
  var max = _.max(categories, (category) => category.total).total;
  max = Math.max(max, 100);

  categoryScale.domain([min, max]);
  _.each(categories, (category) => {
    category.size = categoryScale(category.total);
  });
}

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

// positioning functions
var width = 900;
var height = 700;
var topPadding = height / 3;
var yPadding = (height - topPadding) / 7.5;
var timeScale = d3.time.scale()
  .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59, 999)])
  .range([width * (1 / 5), width * (4 / 5)])
  .clamp(true);
GraphCalculationUtils.positionExpenses = (expenses) => {
  _.each(expenses, (expense) => {
    var exp = ExpenseStore.get(expense.id);
    var time = new Date(0, 0, 0, exp.timestamp.getHours(), exp.timestamp.getMinutes(), exp.timestamp.getSeconds());
    expense.x = timeScale(time);
    expense.fixed = true;
    expense.y = yPadding * (exp.timestamp.getDay() + 1) + topPadding;
  });
}

var force = d3.layout.force()
  .linkDistance(75)
  .charge((d) => -Math.pow(d.size * 2, 2))
  .size([width, topPadding]);
GraphCalculationUtils.positionGraph = (categories, expenses, links) => {
  var nodes = _.union(categories, expenses);
  force.nodes(nodes)
    .links(links)
    .start();
  _.each(_.range(1000), () => {
    force.tick();
    // make sure categories don't go out of bounds
    _.each(categories, (d) => {
      var x1 = d.x - d.size;
      var y1 = d.y - d.size;
      var x2 = d.x + d.size;
      var y2 = d.y + d.size;
      if (x1 < 0) {
        // if it's hitting the left bound
        d.x = d.size;
      } else if (x2 > width) {
        // if it's hitting right bound
        d.x = width - d.size;
      }
      if (y1 < 0) {
        d.y = topPadding + d.size;
      } else if (y2 > topPadding) {
        d.y = topPadding - d.size;
      }
    });
  });
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