var React = require('react/addons');

var LabelComponent = React.createClass({
  render() {
    var style = {
      'background-color': this.props.data.fill || '#fff',
      'color': this.props.data.fill ? '#fff' : '#333',
      'border': !this.props.data.fill && '2px solid #333'
    };
    return (
      <span className="Label label" style={style}>
        {this.props.data.name}
      </span>
    );
  }
});

module.exports = LabelComponent;