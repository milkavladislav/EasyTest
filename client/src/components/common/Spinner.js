import spinner from './spinner.gif';
import React from 'react';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;
