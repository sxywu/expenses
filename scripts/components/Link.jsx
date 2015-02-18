var React = require('react');
var LinkVisualization = require('../visualizations/Link');

var LinkComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Wrapper = d3.select(this.getDOMNode());
    this.d3Wrapper.datum(this.props.data)
      .call(LinkVisualization.enter);
  },
  componentDidUpate() {
    this.d3Wrapper.datum(this.props.data)
      .call(LinkVisualization.update);
  },
  componentWillUnMount() {

  },
  render() {
    return (
      <line className="link" />
    );
  }
});

module.exports = LinkComponent;