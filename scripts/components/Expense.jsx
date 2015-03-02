var React = require('react/addons');
var ExpenseVisualization = require('../visualizations/Expense');
var ViewActionCreators = require('../actions/ViewActionCreators');

var ExpenseComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Wrapper = d3.select(this.getDOMNode());
    this.d3Wrapper.datum(this.props.data)
      .on('click', this.onClick.bind(this))
      .call(ExpenseVisualization.drag, this.beforeDrag, this.onDrag, this.afterDrag)
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
  onClick() {
    ViewActionCreators.selectNode({
      type: 'expense',
      id: this.props.data.id
    });
  },
  beforeDrag() {
    this.props.beforeDrag(this.props.data);
  },
  onDrag(x, y) {
    var expense = React.addons.update(this.props.data, {
      $merge: {update: true, drag: true, x, y}
    });
    this.props.onDrag(expense);
  },
  afterDrag() {
    this.props.afterDrag(this.props.data);
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