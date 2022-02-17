import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Button, IconButton} from '@mui/material';

const close = ({style, deleteComment, _id}) => {
  return (
    <IconButton style={{...style, display:'block'}}
      onClick={(e) => deleteComment(e,_id)}
    >
      {/* {'X'} */}
      <CloseIcon />
      {/* <Icon path={mdiClose}
        title="close"
        size={1}
        onClick={(e) => deleteComment(e,_id)}
      /> */}
    </IconButton>
  );
};

export default close;