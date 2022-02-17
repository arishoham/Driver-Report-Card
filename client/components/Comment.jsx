import React, {useState} from 'react';
import Like from './Like';
import Close from './Close';

const Comment = ({comment, created_on, username, deleteComment, currentUser, ...props}) => {
  const [style, setStyle] = useState({visibility: 'hidden'});
  return (
    <div className='comment'
      onMouseEnter={e => {
        if(currentUser === username) setStyle({visibility: 'visible'});
      }}
      onMouseLeave={e => {
        setStyle({visibility: 'hidden'});
      }}
    >
      <Close 
        style={style}
        deleteComment={deleteComment}
        _id={props._id}
      />
      {comment}
      <div>
        <Like {...props}/>
        {'  '}
        {username}
        {'  '}
        {(new Date(created_on)).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Comment;