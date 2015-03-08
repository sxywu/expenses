var React = require('react/addons');
var cx = React.addons.classSet;
var CategoryComponent = require('./Category.jsx');
var ExpenseComponent = require('./Expense.jsx');

var Home = React.createClass({
  render() {
    return (
      <div className="Home">
        {this.renderDirections()}
        <h4 className="Home-header">
          About
        </h4>
        {this.renderAbout()}
      </div>
    );
  },
  renderDirections() {
    var addClasses = cx({
      "glyphicon": true,
      "glyphicon-plus-sign": true
    });
    var categoryStyle = {width: 50, height: 40};
    var categoryData = {name: 'Coffee', size: 7.5, x: 25, y: 11, fill: '#FF8800', selected: true};
    var category = (
      <svg style={categoryStyle}>
        <CategoryComponent data={categoryData} />
      </svg>
    );
    var expenseStyle = {width: 50, height: 32};
    var expenseData = {name: 'Coffee Bar', size: 10, x: 25, y: 9, selected: true};
    var expense = (
      <svg style={expenseStyle}>
        <ExpenseComponent data={expenseData} />
      </svg>
    );
    return (
      <div className="Directions-body">
        <h4>Start</h4>
        <p>
          From the Add tab:<br />
          {category} add some categories,<br />
          {expense} and then add some expenses.<br />
        </p>
        <h4>Categorize</h4>
        <p>
          Add an expense by dragging it over a category.
          Drag the expense over a linked category to remove it.
          An expense can belong to multiple categories.
        </p>
        <h4>Inspect</h4>
        <p>
          The graph shows a week of expenses at a time.
          Expenses are placed by time of creation.
          Categories are placed at the bottom, and only appear when there are expenses linked to it.
          Click on any expense or category to view them in detail.
        </p>
      </div>
    );
  },
  renderAbout() {
    return (
      <div className="Home-body">
        <p>
        This simple expense-tracking app started out as an example app for a blog post on <a href="http://d3js.org/" target="_new">D3</a>+ 
        <a href="http://facebook.github.io/react/" target="_new">React</a>+ 
        <a href="http://facebook.github.io/flux/docs/overview.html" target="_new">Flux</a>.
        The blog post itself has yet to be written (I got carried away implementing this), but I *am* toying with the idea of expanding on this.
        </p>
        <p>
        Number one on my to-do is to hook this up with the <a href="https://plaid.com/" target="_new">Plaid</a> API to start importing credit card transaction date (manual input?  Ain't nobody got time for that).
        Then better mobile compatibility, and better design and styling.
        </p>
        <p>
        <a href="https://twitter.com/shirleyxywu" target="_new">Let me know what you think</a><br />
        <a href="https://github.com/sxywu/expenses/issues" target="_new">Tell me if you find a bug</a><br />
        </p>
      </div>
    );
  }
});

module.exports = Home;