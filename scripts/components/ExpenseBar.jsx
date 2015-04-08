var React = require('react/addons');
var ExpenseBarVisualization = require('../visualizations/ExpenseBar');
var ViewActionCreators = require('../actions/ViewActionCreators');

var ExpenseBarComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Wrapper = d3.select(this.getDOMNode());
    this.d3Wrapper.datum(this.props.data)
      .call(ExpenseBarVisualization.enter);
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.data.update) {
      this.d3Wrapper.datum(nextProps.data);
    }
    return true;
  },
  componentDidUpate() {
    this.d3Wrapper.datum(this.props.data);
  },
  componentWillUnMount() {

  },
  render() {
    return (
      <rect className="expenseBar" />
    );
  }
});

module.exports = ExpenseBarComponent;