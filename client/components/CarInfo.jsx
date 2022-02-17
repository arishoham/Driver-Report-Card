import React from 'react';

const CarInfo = ({carInfo}) => {
  return (
    <div>
      {carInfo.name}
      {' | '}
      {carInfo.pn}
      {' | '}
      {carInfo.ps}
      <div>
        <img src={carInfo.img} />
      </div>
    </div>
  );
};

export default CarInfo;