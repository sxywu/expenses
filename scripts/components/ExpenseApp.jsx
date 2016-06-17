var React = require('react/addons');
var cx = React.addons.classSet;
var _ = require('lodash');
var d3 = require('d3/d3');

var ViewActionCreators = require('../actions/ViewActionCreators');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var HomeComponent = require('./Home.jsx');
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
      week: d3.time.week(new Date()),
      showModal: !localStorage.getItem('hideModal')
    }
  },
  componentDidMount() {
    CategoryStore.addChangeListener(this.getExpensesForWeek);
    ExpenseStore.addChangeListener(this.getExpensesForWeek);
    this.getExpensesForWeek();

    // also if it's the first time around, add some categories and expenses
    if (!localStorage.notFirstTime) {
      _.defer(() => ViewActionCreators.addCategory({name: 'Groceries'}));
      _.defer(() => ViewActionCreators.addCategory({name: 'Gas'}));
      _.defer(() => ViewActionCreators.addExpense({
        name: "Safeway",
        amount: 40,
        timestamp: new Date()
      }));
      localStorage.setItem('notFirstTime', true);
    }
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
      .map('categories')
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
        <PanelComponent openModal={this.openModal} data={this.state} />
        <GraphComponent data={this.state} />
        <h2 className="Week-title">
          <div className="glyphicon glyphicon-arrow-left"
            onClick={this.onArrowClick.bind(this, 'left')} />
          {weekText}
          <div className={rightArrowClasses}
            onClick={this.onArrowClick.bind(this, 'right')} />
        </h2>
        <HomeComponent closeModal={this.closeModal} data={this.state} />
      </div>
    );
  },
  onArrowClick(direction) {
    var week = this.state.week;
    var dayInMS = 86400000;
    if (direction === 'left') {
      week = new Date(week.getTime() - 6 * dayInMS);
    } else if (direction === 'right' &&
      !_.isEqual(this.state.week, this.state.currentWeek)) {
      week = new Date(week.getTime() + 8 * dayInMS);
    }
    week = d3.time.week(week);
    this.getExpensesForWeek(week);
  },
  openModal() {
    this.setState({showModal: true});
  },
  closeModal() {
    localStorage.setItem('hideModal', true);
    this.setState({showModal: false});
  }
});

module.exports = ExpenseApp;