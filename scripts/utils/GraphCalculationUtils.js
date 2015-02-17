var _ = require('lodash');
var d3 = require('d3/d3');
var CategoryStore = require('../stores/CategoryStore');

var GraphCalculationUtils = {};

/** Gets info from CategoryStore and calculates data
* to render with, such as name, fill, size, etc.
* @return {Array} Array of renderable category objects
*/
var colorScale = d3.scale.category10();
GraphCalculationUtils.calculateCategories = () => {
  var categories = CategoryStore.getAll();
  return _.map(categories, (category) => {
    return {
      name: category.name,
      fill: colorScale(category.name),
      size: 10 // 10 for now
    }
  });
}

module.exports = GraphCalculationUtils;