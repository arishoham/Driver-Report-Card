import React from 'react';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

const close = ({style, deleteComment, _id}) => {
  return (
    <div style={{...style, display:'inline'}}>
      <Icon path={mdiClose}
        title="close"
        size={1}
        onClick={(e) => deleteComment(e,_id)}
      />
    </div>
  );
};

export default close;