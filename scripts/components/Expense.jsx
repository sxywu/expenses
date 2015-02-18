var React = require('react');
var ExpenseVisualization = require('../visualizations/Expense');

var ExpenseComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Wrapper = d3.select(this.getDOMNode());
    this.d3Wrapper.datum(this.props.data)
      .call(ExpenseVisualization.enter);
  },
  componentDidUpate() {
    this.d3Wrapper.datum(this.props.data)
      .call(ExpenseVisualization.update);
  },
  componentWillUnMount() {

  },
  render() {
    return (
      <g className="expense">
        <rect />
        <text />
      </g>
    );
  }
});

module.exports = ExpenseComponent;