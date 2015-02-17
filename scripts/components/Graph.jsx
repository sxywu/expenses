var React = require('react');
var CategoryStore = require('../stores/CategoryStore');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');

var GraphComponent = React.createClass({
  componentDidMount() {
    CategoryStore.addChangeListener(this._onChange);
  },
  componentWillUnMount() {
    CategoryStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    var categories = GraphCalculationUtils.calculateCategories();
    console.log(categories);
  },
  render() {
    return (
      <svg>
        <g className="graph">

        </g>
      </svg>
    );
  }
});

module.exports = GraphComponent;