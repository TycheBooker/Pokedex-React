import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadData, apiRoot } from '../utils/fetchUtils';

class Filters extends Component {
  state = {
    types: []
  };

  componentDidMount() {
    loadData(`${apiRoot}type`).then(data => {
      const types = data.results.map(type => {
        return type.name;
      });
      this.setState({ types });
    });
  }

  isSelected(type) {
    return this.props.activeFilter && this.props.activeFilter === type;
  }

  render() {
    const { types } = this.state;
    const { toggleFilter } = this.props;

    return (
      <div>
        {types.map(type => (
          <button
            key={type}
            className={this.isSelected(type) ? 'red' : ''}
            onClick={() => toggleFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>
    );
  }
}

Filters.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string,
};

export default Filters;
