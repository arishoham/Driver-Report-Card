import { List } from '@mui/material';
import React from 'react';
import Comment from './Comment';

const CommentContainer = ({comments, ...props}) => {
  const commentComponents = comments.map((curr,i) => <Comment
    key={curr._id}
    i={i}
    _id={curr._id}
    comment={curr.comment}
    created_on={curr.created_on}
    username={curr.username}
    like_count={curr.like_count}
    userLike={curr.like_username}
    {...props}
  />);
  return (
    <List>
      {commentComponents}
    </List>
  );
};

export default CommentContainer;