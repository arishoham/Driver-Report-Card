import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { IconButton } from '@mui/material';

const Like = ({ _id, onLike, onUnLike, userLike, i }) => {
  if (userLike == 0) {
    return (
      <IconButton
        variant="outlined"
        aria-label="Like"
        component="span"
        onClick={() => onLike(_id, i)}
      >
        <ThumbUpOutlinedIcon />
      </IconButton>
    );
  } else {
    return (
      <IconButton
        variant="outlined"
        aria-label="Like"
        component="span"
        onClick={() => onUnLike(_id, i)}
      >
        <ThumbUpIcon />
      </IconButton>
    );
  }
};

export default Like;
