var React = require('react/addons');
var ExpenseVisualization = require('../visualizations/Expense');

var ExpenseComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Wrapper = d3.select(this.getDOMNode());
    this.d3Wrapper.datum(this.props.data)
      .call(ExpenseVisualization.drag, this.onDrag)
      .call(ExpenseVisualization.enter);
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.data.update) {
      this.d3Wrapper.datum(nextProps.data)
        .call(ExpenseVisualization.update);
      return false;
    }
    return true;
  },
  componentDidUpate() {
    this.d3Wrapper.datum(this.props.data)
      .call(ExpenseVisualization.update);
  },
  componentWillUnMount() {

  },
  onDrag(x, y) {
    var expense = React.addons.update(this.props.data, {
      $merge: {update: true, drag: true, x, y}
    });
    this.props.onDrag(expense);
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