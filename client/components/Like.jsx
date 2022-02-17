import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const Like = ({like_count, _id, onLike, onUnLike, userLike,i}) => {
  if(userLike == 0){
    return (
      <>
        {/* <Icon path={mdiThumbUpOutline}
          title="like"
          size={1}
          onClick={() => onLike(_id,i)}
        /> */}
        <ThumbUpOutlinedIcon 
          onClick={() => onLike(_id,i)}
        />
        {like_count}
      </>
    );
  } else {
    return(
      <>
        {/* <Icon path={mdiThumbUp}
          title="like"
          size={1}
          onClick={() => onUnLike(_id,i)}
        /> */}
        <ThumbUpIcon 
          onClick={() => onUnLike(_id,i)}
        />
        {like_count}
      </>
    );
  }
};

export default Like;