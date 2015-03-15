var React = require('react/addons');
var _ = require('lodash');
var ViewActionCreators = require('../actions/ViewActionCreators');
var ExpenseStore = require('../stores/ExpenseStore');
var CategoryStore = require('../stores/CategoryStore');
var AppCalculationUtils = require('../utils/AppCalculationUtils');
var LabelComponent = require('./Label.jsx');
var AddExpenseComponent = require('./AddExpense.jsx'); 

var dateFormat = d3.time.format('%m/%d %I:%M%p');
var ExpenseDetail = React.createClass({
  getInitialState() {
    return {
      editing: false
    }
  },
  render() {
    var expense = ExpenseStore.get(this.props.data.id);
    var categories = _.map(expense.categories, (categoryId) => {
      var category = CategoryStore.get(categoryId);
      category = AppCalculationUtils.calculateCategory(category);
      return (<LabelComponent data={category} />);
    });

    return (
      <div className="ExpenseDetail">
        {this.state.editing ? this.renderEdit(expense) : this.renderInfo(expense, categories)}
      </div>
    );
  },
  renderInfo(expense, categories) {
    return (
      <div>
        <h4 className="ExpenseDetail-header">
          {expense.name}
          <br />
          ${expense.amount.toFixed(2)}
        </h4>
        <div className="ExpenseDetail-body">
          <div>
            Date: {dateFormat(expense.timestamp)}
          </div>
          <div>
            Categories:<br />
            {categories}
          </div>
        </div>
        <div className="ExpenseDetail-footer">
          <a className="action" onClick={this.editExpense}>
            Edit
          </a>
          <a className="action" onClick={this.deleteExpense}>
            Delete
          </a>
          <a className="action" onClick={this.closeDetail}>
            Close
          </a>
        </div>
      </div>
    );
  },
  renderEdit(expense) {
    return (
      <AddExpenseComponent data={expense} onSubmit={this.editExpense} />
    );
  },
  editExpense() {
    var editing = !this.state.editing;
    this.setState({editing});
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