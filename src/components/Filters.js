import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { loadData, apiRoot } from '../utils/fetchUtils';

class Filters extends Component {
  state = {
    types: [],
    open: false
  };

  componentDidMount() {
    loadData(`${apiRoot}type`).then(data => {
      this.setState({ types: data.results });
    });
  }

  toggleOpen = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  isSelected(type) {
    return this.props.activeFilter && this.props.activeFilter === type;
  }

  render() {
    const { types, open } = this.state;
    const { toggleFilter } = this.props;

    return (
      <Fragment>
        <button onClick={this.toggleOpen} className="filters-header">
          Filters
        </button>
        {open && (
          <div className="filters">
            {types.map(type => (
              <button
                key={type.name}
                className={this.isSelected(type.name) ? 'active' : ''}
                onClick={() => toggleFilter(type)}
              >
                {type.name}
              </button>
            ))}
          </div>
        )}
      </Fragment>
    );
  }
}

Filters.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string
};

export default Filters;
