import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const close = ({ style, deleteComment, _id }) => {
  return (
    <IconButton
      style={{ ...style, display: 'block' }}
      onClick={(e) => deleteComment(e, _id)}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default close;
