var React = require('react/addons');
var _ = require('lodash');
var ViewActionCreators = require('../actions/ViewActionCreators');
var ExpenseStore = require('../stores/ExpenseStore');
var CategoryStore = require('../stores/CategoryStore');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');
var LabelComponent = require('./Label.jsx');

var dateFormat = d3.time.format('%x');
var ExpenseDetail = React.createClass({
  render() {
    var expense = ExpenseStore.get(this.props.data.id);
    var categories = _.map(expense.categories, (categoryId) => {
      var category = CategoryStore.get(categoryId);
      category = GraphCalculationUtils.calculateCategory(category);
      return (<LabelComponent data={category} />);
    });
    return (
      <div className="ExpenseDetail">
        <h4>
          <LabelComponent data={expense} /> ${expense.amount.toFixed(2)}
        </h4>
        <div>
          Date: {dateFormat(expense.timestamp)} 
        </div>
        <div>
          Categories: {categories}
        </div>
      </div>
    );
  }
});

module.exports = ExpenseDetail;