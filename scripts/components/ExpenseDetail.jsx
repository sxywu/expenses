var React = require('react/addons');
var _ = require('lodash');
var ViewActionCreators = require('../actions/ViewActionCreators');
var ExpenseStore = require('../stores/ExpenseStore');
var CategoryStore = require('../stores/CategoryStore');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');
var LabelComponent = require('./Label.jsx');

var dateFormat = d3.time.format('%x');
var ExpenseDetail = React.createClass({
  componentDidMount() {
    window.addEventListener('keypress', this.windowKeyPress);
  },
  componentWillUnMount() {
    window.removeEventListener('keypress', this.windowKeyPress);
  },
  render() {
    var expense = ExpenseStore.get(this.props.data.id);
    var categories = _.map(expense.categories, (categoryId) => {
      var category = CategoryStore.get(categoryId);
      category = GraphCalculationUtils.calculateCategory(category);
      return (<LabelComponent data={category} />);
    });
    return (
      <div className="ExpenseDetail">
        <h4 className="ExpenseDetail-header">
          <LabelComponent data={expense} />
          ${expense.amount.toFixed(2)}
          <span className="ExpenseDetail-close glyphicon glyphicon-remove-circle" />
        </h4>
        <div className="ExpenseDetail-body">
          <div>
            Date: {dateFormat(expense.timestamp)} 
          </div>
          <div>
            Categories: {categories}
          </div>
        </div>
        <div className="ExpenseDetail-footer">
          <a className="action" onClick={this.deleteExpense}>
            Delete expense
          </a>
        </div>
      </div>
    );
  },
  windowKeyPress(e) {
    e.stopPropagation();

    var CHAR_D = 100;
    var pressedKey = e.keyCode;
    if (pressedKey === CHAR_D) {
      this.deleteExpense();
    }
  },
  deleteExpense() {
    ViewActionCreators.deleteExpense(this.props.data.id);
    ViewActionCreators.unselectNode();
  }
});

module.exports = ExpenseDetail;