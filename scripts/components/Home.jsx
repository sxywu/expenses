var React = require('react/addons');
var cx = React.addons.classSet;
var CategoryComponent = require('./Category.jsx');
var ExpenseComponent = require('./Expense.jsx');

var Home = React.createClass({
  render() {
    return (
      <div className="Home">
        <h4 className="Home-header">
          Getting started
        </h4>
        {this.renderDirections()}

        <h4 className="Home-header">
          About
        </h4>
        <div className="Home-body">

        </div>
      </div>
    );
  },
  renderDirections() {
    var addClasses = cx({
      "glyphicon": true,
      "glyphicon-plus-sign": true
    });
    var categoryStyle = {width: 50, height: 38};
    var categoryData = {name: 'Coffee', size: 7.5, x: 25, y: 10, fill: '#3B8686', selected: true};
    var category = (
      <svg style={categoryStyle}>
        <CategoryComponent data={categoryData} />
      </svg>
    );
    var expenseStyle = {width: 50, height: 30};
    var expenseData = {name: 'Coffee Bar', size: 10, x: 25, y: 8, selected: true};
    var expense = (
      <svg style={expenseStyle}>
        <ExpenseComponent data={expenseData} />
      </svg>
    );
    return (
      <div className="Home-body">
        <p>
          <span className={addClasses} />From the Add tab,<br />
          {category} add some categories,<br />
          {expense} and then add some expenses.<br />
        </p>
        <p>

        </p>
      </div>
    );
  }
});

module.exports = Home;