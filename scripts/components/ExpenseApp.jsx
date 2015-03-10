var React = require('react/addons');
var cx = React.addons.classSet;
var _ = require('lodash');
var d3 = require('d3/d3');

var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var PanelComponent = require('./Panel.jsx');
var GraphComponent = require('./Graph.jsx');

// notes: how to stagger transitions?
// eventually use immutable diff?
// todo: instructions
var weekFormat = d3.time.format('%b. %d, %Y');
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
    CategoryStore.addChangeListener(this.getExpensesForWeek);
    ExpenseStore.addChangeListener(this.getExpensesForWeek);
    this.getExpensesForWeek();
  },
  componentWillUnMount() {
    CategoryStore.removeChangeListener(this.getExpensesForWeek);
    ExpenseStore.removeChangeListener(this.getExpensesForWeek);
  },
  getExpensesForWeek(week) {
    week = week || this.state.week;
    var expenses = _.filter(ExpenseStore.getAll(), (expense) => {
      return _.isEqual(week, d3.time.week(expense.timestamp));
    });
    var categories = _.chain(expenses)
      .pluck('categories')
      .flatten().uniq()
      .map((categoryId) => CategoryStore.get(categoryId))
      .value();

    this.setState({week, expenses, categories});
  },
  render() {
    var rightArrowClasses = cx({
      'glyphicon': true,
      'glyphicon-arrow-right': true,
      'disabled': _.isEqual(this.state.week, this.state.currentWeek)
    });
    var weekText = "Week of " + weekFormat(this.state.week);
    return (
      <div>
        <PanelComponent data={this.state} />
        <GraphComponent data={this.state} />
        <h2 className="Week-title">
          <div className="glyphicon glyphicon-arrow-left"
            onClick={this.onArrowClick.bind(this, 'left')} />
          {weekText}
          <div className={rightArrowClasses}
            onClick={this.onArrowClick.bind(this, 'right')} />
        </h2>
      </div>
    );
  },
  onArrowClick(direction) {
    var week = this.state.week;
    var weekInMS = 7 * 86400000;
    if (direction === 'left') {
      week = new Date(week.getTime() - weekInMS);
      this.getExpensesForWeek(week);
    } else if (direction === 'right' &&
      !_.isEqual(this.state.week, this.state.currentWeek)) {
      week = week = new Date(week.getTime() + weekInMS);
      this.getExpensesForWeek(week);
    }
  }
});

module.exports = ExpenseApp;