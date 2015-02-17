var React = require('react');
var CategoryVisualization = require('../visualizations/Category');

var CategoryComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Wrapper = d3.select(this.getDOMNode());
    this.d3Wrapper.datum(this.props.data)
      .call(CategoryVisualization.position)
      .call(CategoryVisualization.enter);
  },
  componentDidUpate() {

  },
  componentWillUnMount() {

  },
  render() {
    return (
      <g className="category">
        <circle />
      </g>
    );
  }
});

module.exports = CategoryComponent;