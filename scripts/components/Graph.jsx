var React = require('react/addons');
var _ = require('lodash');
var d3 = require('d3/d3');

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
var GraphDateComponent = require('./GraphDate.jsx');

var width = 900;
var height = 700;
var GraphComponent = React.createClass({
  getInitialState() {
    return {
      categories: [],
      expenses: [],
      links: [],
      dates: []
    }
  },
  componentDidMount() {
    GraphStore.addChangeListener(this._onChange);  
    SelectionStore.addChangeListener(this._onChange);
    this._onChange(); // remove this later, better to have it go through dispatcher
  },
  componentWillReceiveProps(nextProps) {
    this._onChange(nextProps);
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
    GraphStore.removeChangeListener(this._onChange);
    SelectionStore.removeChangeListener(this._onChange);
  },
  _onChange(props) {
    props = props || this.props;
    var selection = SelectionStore.getSelection();
    // get expenses from store for this week, and then use it to calculate expenses, 
    var expensesData = _.filter(ExpenseStore.getAll(), (expense) => {
      return _.isEqual(props.data.week, d3.time.week(expense.timestamp));
    });
    var categories = GraphCalculationUtils.calculateCategories(expensesData);
    var expenses = GraphCalculationUtils.calculateExpenses(expensesData);
    var links = GraphCalculationUtils.calculateLinks(categories, expenses);
    // calculate some more rendering things
    GraphCalculationUtils.calculateSizes(categories);
    GraphCalculationUtils.highlightSelections(selection, categories, expenses);
    // calculate their positions
    GraphCalculationUtils.setDocumentDimensions(width, height);
    GraphCalculationUtils.positionExpenses(expenses);
    GraphCalculationUtils.positionGraph(categories, expenses, links);
    var dates = GraphCalculationUtils.getDatesForWeek(props.data.week);

    var state = {categories, expenses, links, dates};
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
    var categories = GraphCalculationUtils.calculateCategories();
    var expenses = [expense];
    var links = GraphCalculationUtils.calculateLinks(categories, expenses);
    _.each(categories, (category) => {
      category.size = 15;
    });
    GraphCalculationUtils.positionGraphBeforeDrag(categories, expenses, links);

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

  afterDragExpense(expense) {
    var category = this.findOverlappingCategory(expense);
    if (category) {
      ViewActionCreators.addExpenseToCategory({expense, category});
    }
    ViewActionCreators.afterDragExpense(expense);
  },

  render() {
    var panel = document.getElementsByClassName('Panel')[0];
    var left = panel ? panel.offsetWidth : 325;
    width = window.innerWidth - left;
    height = window.innerHeight;
    var svgStyle = {position: 'absolute', width, height, left};

    var links = _.map(this.state.links, (link) => {
      var key = link.source.id + ',' + link.target.id;
      return (<LinkComponent key={key} data={link} />);
    });
    var categories = _.map(this.state.categories, (category) => {
      return (<CategoryComponent key={category.id} data={category} />);
    });
    var expenses = _.map(this.state.expenses, (expense) => {
      return (<ExpenseComponent key={expense.id} data={expense}
        beforeDrag={this.beforeDragExpense} onDrag={this.onDragExpense} afterDrag={this.afterDragExpense} />);
    });
    var dates = _.map(this.state.dates, (date) => {
      return (<GraphDateComponent data={date} />);
    });

    return (
      <svg style={svgStyle}>
        <g className="graph">
          {dates}
          {links}
          {categories}
          {expenses}
        </g>
      </svg>
    );
  }
});

module.exports = GraphComponent;