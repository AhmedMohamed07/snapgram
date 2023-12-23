import React from 'react';
import loader from '../../../puplic/assets/icons/loader.svg'

const Loader = () => {
  return (
    <div className="w-full flex-center">
      <img
        src={loader}
        alt="loding"
        width={24}
        height={24}
      />
    </div>
  );
};

export default Loader;
