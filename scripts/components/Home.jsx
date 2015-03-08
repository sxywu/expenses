var React = require('react/addons');
var cx = React.addons.classSet;
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
    var addClasses = cx({
      "glyphicon": true,
      "glyphicon-plus-sign": true
    });
    var categoryStyle = {width: 80, height: 60};
    var categoryData = {name: 'Restaurant', size: 15, x: 40, y: 25, fill: '#84315A'};
    var category = (
      <svg style={categoryStyle}>
        <CategoryComponent data={categoryData} />
      </svg>
    );
    return (
      <div className="Home-body">
        <span className={addClasses} />From the Add tab<br />
        {category} add some categories 
      </div>
    );
  }
});

module.exports = Home;