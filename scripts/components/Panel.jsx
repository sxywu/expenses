var React = require('react/addons');
var SelectionStore = require('../stores/SelectionStore');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var AddCategoryComponent = require('./AddCategory.jsx');
var AddExpenseComponent = require('./AddExpense.jsx');
var CategoryDetailComponent = require('./CategoryDetail.jsx');
var ExpenseDetailComponent = require('./ExpenseDetail.jsx');

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
    this.setState({selection});
  },
  render() {
    var detailComponent = null;
    if (this.state.selection && this.state.selection.type === 'category') {
      detailComponent = (<CategoryDetailComponent data={this.state.selection} />);
    } else if (this.state.selection && this.state.selection.type === 'expense') {
      detailComponent = (<ExpenseDetailComponent data={this.state.selection} />);
    }
    
    return (
      <div>
        <AddCategoryComponent />
        <AddExpenseComponent />
        {detailComponent}
      </div>
    );
  }
});

module.exports = ExpenseApp;