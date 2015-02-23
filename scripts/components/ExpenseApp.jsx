var React = require('react/addons');
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
      categories: CategoryStore.getAll(),
      expenses: ExpenseStore.getAll()
    }
  },
  render() {
    return (
      <div>
        <PanelComponent />
        <GraphComponent />
      </div>
    );
  }
});

module.exports = ExpenseApp;