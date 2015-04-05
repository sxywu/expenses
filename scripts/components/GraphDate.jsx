var React = require('react/addons');
var GraphDate = require('../visualizations/GraphDate');
var ViewActionCreators = require('../actions/ViewActionCreators');

var GraphDateComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Wrapper = d3.select(this.getDOMNode());
    this.d3Wrapper.datum(this.props.data)
      .call(GraphDate.enter)
      .call(GraphDate.update);
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.data.update) {
      this.d3Wrapper.datum(nextProps.data)
        .call(GraphDate.update);
      return false;
    }
    return true;
  },
  componentDidUpdate() {
    this.d3Wrapper.datum(this.props.data)
        .call(GraphDate.update);
  },
  render() {
    var total = "$";
    total += this.props.data.total ? this.props.data.total.toFixed(2) : 0;
    var date = this.props.data.formattedDate;

    return (
      <g className="GraphDate">
        <rect onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} />
        <text className="date">
          {date}
        </text>
      </g>
    );
  },
  onMouseEnter() {
    this.d3Wrapper.call(GraphDate.onMouseEnter);
  },
  onMouseLeave() {
    this.d3Wrapper.call(GraphDate.onMouseLeave);
  }
});

module.exports = GraphDateComponent;