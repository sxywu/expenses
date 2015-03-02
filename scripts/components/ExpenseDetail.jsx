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
        <h4 className="ExpenseDetail-header">
          <LabelComponent data={expense} />
          ${expense.amount.toFixed(2)}
          <span className="ExpenseDetail-close glyphicon glyphicon-remove-circle"
            onClick={this.closeDetail} />
        </h4>
        <div className="ExpenseDetail-body">
          <div>
            Date: {dateFormat(expense.timestamp)} 
          </div>
          <div>
            Categories: {categories}
          </div>
        </div>
        <div className="ExpenseDetail-footer">
          <a className="action" onClick={this.deleteExpense}>
            Delete expense
          </a>
        </div>
      </div>
    );
  },
  deleteExpense() {
    ViewActionCreators.deleteExpense(this.props.data.id);
    ViewActionCreators.unselectNode();
  },
  closeDetail() {
    ViewActionCreators.unselectNode();
  }
});

module.exports = ExpenseDetail;