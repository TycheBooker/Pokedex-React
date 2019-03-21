import React from 'react';
import PropTypes from 'prop-types';

const SimpleList = props => {
  const { listTitle, listItems } = props;
  return (
    <div>
      {listTitle && <h2>{listTitle}</h2>}

      <ul>
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
