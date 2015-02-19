var React = require('react');
var CategoryVisualization = require('../visualizations/Category');

var CategoryComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Wrapper = d3.select(this.getDOMNode());
    this.d3Wrapper.datum(this.props.data)
      .call(CategoryVisualization.enter);
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.data.update) {
      this.d3Wrapper.datum(nextProps.data)
        .call(CategoryVisualization.update);
      return false;
    }
    return true;
  },
  componentDidUpate() {
    this.d3Wrapper.datum(this.props.data)
      .call(CategoryVisualization.update);
  },
  componentWillUnMount() {

  },
  render() {
    return (
      <g className="category">
        <circle />
        <text />
      </g>
    );
  }
});

module.exports = CategoryComponent;