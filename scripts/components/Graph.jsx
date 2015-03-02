var React = require('react/addons');
var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ViewActionCreators = require('../actions/ViewActionCreators');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var GraphStore = require('../stores/GraphStore');
var SelectionStore = require('../stores/SelectionStore');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');
var CategoryComponent = require('./Category.jsx');
var ExpenseComponent = require('./Expense.jsx');
var LinkComponent = require('./Link.jsx');

var overlappedCategories = [];

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
    GraphStore.addChangeListener(this._onChange);
    SelectionStore.addChangeListener(this._onChange);
    this._onChange(); // remove this later, better to have it go through dispatcher
  },
  componentDidUpdate() {
    this.callViewActionCreators(() => {
      ViewActionCreators.savePositions({
        categories: this.state.categories,
        expenses: this.state.expenses
      });
    });
  },
  componentWillUnMount() {
    CategoryStore.removeChangeListener(this._onChange);
    ExpenseStore.removeChangeListener(this._onChange);
    GraphStore.removeChangeListener(this._onChange);
    SelectionStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    var selection = SelectionStore.getSelection();
    var categories = GraphCalculationUtils.calculateCategories();
    var expenses = GraphCalculationUtils.calculateExpenses();
    var links = GraphCalculationUtils.calculateLinks(categories, expenses);
    GraphCalculationUtils.calculateSizes(categories);
    GraphCalculationUtils.highlightSelections(selection, categories, expenses);
    GraphCalculationUtils.positionGraph(categories, expenses, links);

    var state = {categories, expenses, links};
    GraphCalculationUtils.calculateUpdate(this.state, state);
    this.setState(state);
  },
  // probably should be abstracted out somewhere
  callViewActionCreators(callback) {
    setTimeout(() => {
      if (AppDispatcher.isDispatching()) {
        this.callViewActionCreators(callback);
      } else {
        callback();
      }
    }, 500);
  },
  findOverlappingCategory(expense) {
    return _.find(this.state.categories, (category) => {
      var x1 = category.x - category.size;
      var y1 = category.y - category.size;
      var x2 = category.x + category.size;
      var y2 = category.y + category.size;

      return x1 < expense.x && expense.x < x2 &&
             y1 < expense.y && expense.y < y2;
    });
  },

  beforeDragExpense(expense) {
    var selection = {type: 'expense', id: expense.id};
    var categories = this.state.categories;
    var expenses = this.state.expenses;
    var links = this.state.links;
    GraphCalculationUtils.highlightSelections(selection, categories, expenses);

    this.setState({categories, expenses, links});
  },

  onDragExpense(expense) {
    var category = this.findOverlappingCategory(expense);
    if (category) {
      overlappedCategories.push(category.id);
    }

    // replace the dragged expense in expenses array
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

  afterDragExpense(expense) {
    var categories = _.uniq(overlappedCategories);
    if (categories.length) {
      ViewActionCreators.addExpenseToCategory({expense, categories});
      // then clean overlapped categories for next drag
      overlappedCategories = [];
    }
    ViewActionCreators.afterDragExpense(expense);
  },

  render() {
    var panel = document.getElementsByClassName('Panel')[0];
    var left = panel ? panel.offsetWidth : 0;
    var width = window.innerWidth - left;
    var height = window.innerHeight;
    var svgStyle = {position: 'absolute', width, height, left};

    var links = this.state.links && _.map(this.state.links, (link) => {
      var key = link.source.id + ',' + link.target.id;
      return (<LinkComponent key={key} data={link} />);
    });
    var categories = this.state.categories && _.map(this.state.categories, (category) => {
      return (<CategoryComponent key={category.id} data={category} />);
    });
    var expenses = this.state.expenses && _.map(this.state.expenses, (expense) => {
      return (<ExpenseComponent key={expense.id} data={expense}
        beforeDrag={this.beforeDragExpense} onDrag={this.onDragExpense} afterDrag={this.afterDragExpense} />);
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