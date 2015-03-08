var React = require('react/addons');
var CategoryComponent = require('./Category.jsx');

var Home = React.createClass({
  render() {
    return (
      <div className="Home">
        <h4 className="Home-header">
          Getting started
        </h4>
        {this.renderDirections()}

        <h4 className="Home-header">
          About
        </h4>
        <div className="Home-body">

        </div>
      </div>
    );
  },
  renderDirections() {
    var categoryStyle = {width: 80, height: 60};
    var categoryData = {name: 'Restaurants', size: 15, x: 40, y: 24, fill: '#84315A'};
    var category = (
      <svg style={categoryStyle}>
        <CategoryComponent data={categoryData} />
      </svg>
    );
    return (
      <div className="Home-body">
        <li>{category} add some categories</li>
      </div>
    );
  }
});

module.exports = Home;