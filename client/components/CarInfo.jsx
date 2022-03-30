import React from 'react';
import { Box, Typography } from '@mui/material';

const CarInfo = ({ carInfo }) => {
  return (
    <Box
      id="car-info"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
        my: 2,
      }}
    >
      <img src={carInfo.img} id="plate-img" />
      <Typography
        component="h3"
        sx={{
          fontWeight: 'bold',
          mx: 0.5,
          fontSize: 40,
          color: 'text.primary',
        }}
      >
        {carInfo.name}
      </Typography>
    </Box>
  );
};

export default CarInfo;
