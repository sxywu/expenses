var React = require('react/addons');
var SelectionStore = require('../stores/SelectionStore');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var AddCategoryComponent = require('./AddCategory.jsx');
var AddExpenseComponent = require('./AddExpense.jsx');
var CategoryDetailComponent = require('./CategoryDetail.jsx');

// notes: how to stagger transitions?
// eventually use immutable diff?
// todo: instructions
var ExpenseApp = React.createClass({
  getInitialState() {
    return {
      selection: SelectionStore.getSelection()
    }
  },
  componentDidMount() {
    SelectionStore.addChangeListener(this._onChange);
    this._onChange(); // TODO: remove this later, better to have it go through dispatcher
  },
  componentWillUnMount() {
    SelectionStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    var selection = SelectionStore.getSelection();
  },
  render() {
    return (
      <div>
        <AddCategoryComponent />
        <AddExpenseComponent />
        <CategoryDetailComponent />
      </div>
    );
  }
});

module.exports = ExpenseApp;