import React from 'react';
import Icon from '@mdi/react';
import { mdiThumbUpOutline, mdiThumbUp } from '@mdi/js';

const Like = ({like_count, _id, onLike, onUnLike, userLike,i}) => {
  if(userLike == 0){
    return (
      <>
        <Icon path={mdiThumbUpOutline}
          title="like"
          size={1}
          onClick={() => onLike(_id,i)}
        />
        {like_count}
      </>
    );
  } else {
    return(
      <>
        <Icon path={mdiThumbUp}
          title="like"
          size={1}
          onClick={() => onUnLike(_id,i)}
        />
        {like_count}
      </>
    );
  }
};

export default Like;