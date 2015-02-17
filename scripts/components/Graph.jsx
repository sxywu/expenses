var React = require('react');
var _ = require('lodash');

var CategoryStore = require('../stores/CategoryStore');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');
var CategoryComponent = require('./Category.jsx');

var GraphComponent = React.createClass({
  getInitialState() {
    return {
      categories: []
    }
  },
  componentDidMount() {
    CategoryStore.addChangeListener(this._onChange);
    this._onChange(); // remove this later, better to have it go through dispatcher
  },
  componentWillUnMount() {
    CategoryStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    var categories = GraphCalculationUtils.calculateCategories();
    console.log(categories);

    this.setState({categories});
  },
  render() {
    var categories = this.state.categories && _.map(this.state.categories, (category) => {
      return (<CategoryComponent key={category.id} data={category} />);
    });
    return (
      <svg>
        <g className="graph">
          {categories}
        </g>
      </svg>
    );
  }
});

module.exports = GraphComponent;