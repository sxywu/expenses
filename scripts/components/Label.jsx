var React = require('react/addons');

var LabelComponent = React.createClass({
  render() {
    var style = {
      'background-color': this.props.data.fill,
      'color': '#fff' 
    };
    return (
      <span className="Label label" style={style}>
        {this.props.data.name}
      </span>
    );
  }
});

module.exports = LabelComponent;