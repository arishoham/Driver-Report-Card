import React from 'react';

const CarInfo = ({carInfo}) => {
  return (
    <div>
      {carInfo.name}
      {' | '}
      {carInfo.pn}
      {' | '}
      {carInfo.ps}
    </div>
  );
};

export default CarInfo;