var React = require('react');
var CategoryStore = require('../stores/CategoryStore');
var AddCategoryComponent = require('./AddCategory.jsx');
var GraphComponent = require('./Graph.jsx');

var ExpenseApp = React.createClass({
  getInitialState() {
    return {
      categories: CategoryStore.getAll()
    }
  },
  render() {
    return (
      <div>
        <AddCategoryComponent />
        <GraphComponent />
      </div>
    );
  }
});

module.exports = ExpenseApp;