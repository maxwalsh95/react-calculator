import React from 'react';
import PropTypes from 'prop-types';

function ValueButton({ className, onClick, value, display }) {
  return (
    <button className={className} type="button" onClick={() => onClick(value)}>
      {display}
    </button>
  );
}

ValueButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  display: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ValueButton;
