var React = require('react/addons');
var LinkVisualization = require('../visualizations/Link');

var LinkComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Node = d3.select(this.getDOMNode());
    this.d3Node.datum(this.props.data)
      .call(LinkVisualization.enter);
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.data.source.update || nextProps.data.target.update) {
      // if either side of the link had an update, update the link too
      this.d3Node.datum(nextProps.data)
        .call(LinkVisualization.update);
      return false;
    }
    return true;
  },
  componentDidUpate() {
    this.d3Node.datum(this.props.data)
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