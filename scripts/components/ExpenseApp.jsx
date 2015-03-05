var React = require('react/addons');
var _ = require('lodash');
var d3 = require('d3/d3');

var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var PanelComponent = require('./Panel.jsx');
var GraphComponent = require('./Graph.jsx');

// notes: how to stagger transitions?
// eventually use immutable diff?
// todo: instructions, selection/highlight, positioning, direction on drag
var ExpenseApp = React.createClass({
  getInitialState() {
    return {
      categories: [],
      expenses: [],
      currentWeek: d3.time.week(new Date()),
      week: d3.time.week(new Date())
    }
  },
  componentDidMount() {
    this.getExpensesForWeek();
  },
  getExpensesForWeek() {
    var expenses = _.filter(ExpenseStore.getAll(), (expense) => {
      return _.isEqual(this.state.week, d3.time.week(expense.timestamp));
    });
    var categories = _.chain(expenses)
      .pluck('categories')
      .flatten().uniq()
      .map((categoryId) => CategoryStore.get(categoryId))
      .value();

    this.setState({expenses, categories});
  },
  render() {
    return (
      <div>
        <PanelComponent />
        <GraphComponent data={this.state} />
      </div>
    );
  }
});

module.exports = ExpenseApp;