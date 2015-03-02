var React = require('react/addons');
var _ = require('lodash');
var ViewActionCreators = require('../actions/ViewActionCreators');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var LabelComponent = require('./Label.jsx');

var dateFormat = d3.time.format('%x');
var CategoryDetail = React.createClass({
  render() {
    var category = CategoryStore.get(this.props.data.id);
    category = GraphCalculationUtils.calculateCategory(category);
    var expenses = _.chain(ExpenseStore.getAll())
      .filter((expense) => {
        return _.contains(expense.categories, category.id);
      }).map((expense) => {
        return (
          <tr>
            <td>{dateFormat(expense.timestamp)}</td>
            <td>{expense.name}</td>
            <td>${expense.amount.toFixed(2)}</td>
          </tr>
        );
      }).value();

    return (
      <div className="CategoryDetail">
        <h4 className="CategoryDetail-header">
          <LabelComponent data={category} /> 
          ${category.total.toFixed(2)}
          <span className="CategoryDetail-close glyphicon glyphicon-remove-circle" />
        </h4>
        <div className="CategoryDetail-body">
          <table>
            <tbody>
              {expenses}
            </tbody>
          </table>
        </div>
        <div className="CategoryDetail-footer">
          <a className="action" onClick={this.deleteCategory}>
            Delete category
          </a>
        </div>
      </div>
    );
  },
  deleteCategory() {
    ViewActionCreators.deleteCategory(this.props.data.id);
    ViewActionCreators.unselectNode();
  }
});

module.exports = CategoryDetail;