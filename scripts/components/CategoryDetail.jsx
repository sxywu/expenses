var d3 = require('d3/d3');
var React = require('react/addons');
var _ = require('lodash');
var ViewActionCreators = require('../actions/ViewActionCreators');
var AppCalculationUtils = require('../utils/AppCalculationUtils');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var LabelComponent = require('./Label.jsx');

var dateFormat = d3.time.format('%m/%d');
var CategoryDetail = React.createClass({
  render() {
    var category = CategoryStore.get(this.props.data.id);
    category = AppCalculationUtils.calculateCategory(category, this.props.expenses);
    var expenses = _.chain(this.props.expenses)
      .filter((expense) => {
        return _.includes(expense.categories, category.id);
      }).map((expense) => {
        return (
          <div className="table-row">
            <div className="table-cell">{dateFormat(expense.timestamp)}</div>
            <div className="table-cell">{expense.name}</div>
            <div className="table-cell">${expense.amount.toFixed(2)}</div>
          </div>
        );
      }).value();

    return (
      <div className="CategoryDetail">
        <h4 className="CategoryDetail-header">
          {category.name}
          <br />
          ${category.total.toFixed(2)}
          <span className="CategoryDetail-actions">
            <a className="action" onClick={this.deleteCategory}>
              Delete
            </a>
            <a className="action" onClick={this.closeDetail}>
              Close
            </a>
          </span>
        </h4>
        <div className="CategoryDetail-body">
          <div className="table">
            {expenses}
          </div>
        </div>
      </div>
    );
  },
  deleteCategory() {
    ViewActionCreators.deleteCategory(this.props.data.id);
  },
  closeDetail() {
    ViewActionCreators.unselectNode();
  }
});

module.exports = CategoryDetail;