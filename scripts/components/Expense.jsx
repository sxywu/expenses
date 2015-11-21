var React = require('react/addons');
var ExpenseVisualization = require('../visualizations/Expense');
var ViewActionCreators = require('../actions/ViewActionCreators');

var ExpenseComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Node = d3.select(this.getDOMNode());
    this.d3Node.datum(this.props.data)
      .on('click', this.onClick.bind(this))
      .call(ExpenseVisualization.drag, this.beforeDrag, this.onDrag, this.afterDrag)
      .call(ExpenseVisualization.enter);
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.data.update) {
      this.d3Node.datum(nextProps.data);
    }
    return true;
  },
  componentDidUpate() {
    this.d3Node.datum(this.props.data);
  },
  componentWillUnMount() {

  },
  render() {
    return (
      <g className="expense">
        <rect className="expenseRect" />
        <rect className="textBG" />
        <text>{this.props.data.name}</text>
      </g>
    );
  },
  // events
  onClick() {
    if (!this.props.data.id) return;

    if (this.props.data.selected) {
      ViewActionCreators.unselectNode();
    } else {
      ViewActionCreators.selectNode({
        type: 'expense',
        id: this.props.data.id
      });
    }
  },
  beforeDrag() {
    if (!this.props.data.id) return;
    this.props.beforeDrag(this.props.data);
  },
  onDrag(x, y) {
    if (!this.props.data.id) return;
    var expense = React.addons.update(this.props.data, {
      $merge: {update: true, x, y}
    });
    this.props.onDrag(expense);
  },
  afterDrag() {
    if (!this.props.data.id) return;
    this.props.afterDrag(this.props.data);
  }
});

module.exports = ExpenseComponent;