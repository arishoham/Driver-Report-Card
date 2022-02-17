import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const close = ({style, deleteComment, _id}) => {
  return (
    <div style={{...style, display:'inline'}}
      onClick={(e) => deleteComment(e,_id)}
    >
      {/* {'X'} */}
      <CloseIcon />
      {/* <Icon path={mdiClose}
        title="close"
        size={1}
        onClick={(e) => deleteComment(e,_id)}
      /> */}
    </div>
  );
};

export default close;