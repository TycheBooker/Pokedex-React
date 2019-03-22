import React from 'react';
import PropTypes from 'prop-types';

const SimpleList = props => {
  const { listTitle, listItems } = props;
  return (
    <div className="simple-list">
      {listTitle && <h4 className="simple-list-title">{listTitle}</h4>}

      <ul className="simple-list-list">
        {listItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

SimpleList.propTypes = {
  listTitle: PropTypes.string,
  listItems: PropTypes.array.isRequired
};

export default SimpleList;
