var React = require('react/addons');
var _ = require('lodash');

var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');
var CategoryComponent = require('./Category.jsx');
var ExpenseComponent = require('./Expense.jsx');
var LinkComponent = require('./Link.jsx');

var GraphComponent = React.createClass({
  getInitialState() {
    return {
      categories: [],
      expenses: [],
      links: []
    }
  },
  componentDidMount() {
    CategoryStore.addChangeListener(this._onChange);
    ExpenseStore.addChangeListener(this._onChange);
    this._onChange(); // remove this later, better to have it go through dispatcher
  },
  componentWillUnMount() {
    CategoryStore.removeChangeListener(this._onChange);
    ExpenseStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    var categories = GraphCalculationUtils.calculateCategories();
    var expenses = GraphCalculationUtils.calculateExpenses();
    var links = GraphCalculationUtils.calculateLinks(categories, expenses);
    GraphCalculationUtils.positionGraph(categories, expenses, links);

    var state = {categories, expenses, links};
    GraphCalculationUtils.calculateUpdate(this.state, state);
    this.setState(state);
  },

  onDragExpense(expense) {
    // first replace the dragged expense in expenses array
    var expenses = _.map(this.state.expenses, (exp) => {
      if (exp.id === expense.id) return expense;
      return exp;
    });
    // then go through links and update any sides
    // that point to the expense
    var links = _.map(this.state.links, (link) => {
      if (link.source.id === expense.id) {
        return React.addons.update(link, {
          $merge: {source: expense}
        });
      }
      if (link.target.id === expense.id) {
        return React.addons.update(link, {
          $merge: {target: expense}
        });
      }
      return link;
    });

    var state = React.addons.update(this.state, {
      $merge: {expenses, links}
    });
    this.setState(state);
  },

  render() {
    var svgStyle = {width: 1000, height: 1000};
    var links = this.state.links && _.map(this.state.links, (link) => {
      var key = link.source.id + ',' + link.target.id;
      return (<LinkComponent key={key} data={link} />);
    });
    var categories = this.state.categories && _.map(this.state.categories, (category) => {
      return (<CategoryComponent key={category.id} data={category} />);
    });
    var expenses = this.state.expenses && _.map(this.state.expenses, (expense) => {
      return (<ExpenseComponent key={expense.id} data={expense} onDrag={this.onDragExpense} />);
    });
    return (
      <svg style={svgStyle}>
        <g className="graph">
          {links}
          {categories}
          {expenses}
        </g>
      </svg>
    );
  }
});

module.exports = GraphComponent;