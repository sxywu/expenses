var React = require('react');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var AddCategoryComponent = require('./AddCategory.jsx');
var AddExpenseComponent = require('./AddExpense.jsx');
var GraphComponent = require('./Graph.jsx');

var ExpenseApp = React.createClass({
  getInitialState() {
    return {
      categories: CategoryStore.getAll(),
      expenses: ExpenseStore.getAll()
    }
  },
  render() {
    return (
      <div>
        <AddCategoryComponent />
        <AddExpenseComponent />
        <GraphComponent />
      </div>
    );
  }
});

module.exports = ExpenseApp;