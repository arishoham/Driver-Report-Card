import React, {useState} from 'react';
import Like from './Like';
import Close from './Close';
import {Box, ListItem, ListItemText, ListItemIcon, Typography} from '@mui/material';

const Comment = ({comment, created_on, username, deleteComment, currentUser, like_count, ...props}) => {
  const [style, setStyle] = useState({visibility: 'hidden'});
  return (
    <ListItem
      className='comment'
      disablePadding
      onMouseEnter={e => {
        if(currentUser === username) setStyle({visibility: 'visible'});
      }}
      onMouseLeave={e => {
        setStyle({visibility: 'hidden'});
      }}
      sx={{
        border: 1,
        borderRadius: 2,
        borderColor: 'text.disabled',
        my: 1
      }}
    >
      <Like {...props}/>
      <ListItemIcon 
        sx={{minWidth: 40}}
      >
        {like_count}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {comment}
          </Typography>
        }
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {username}
            </Typography>
            {' - ' + (new Date(created_on)).toLocaleDateString()}
          </>
        }
      />
      <Close 
        style={style}
        deleteComment={deleteComment}
        _id={props._id}
      />
    </ListItem>
  );
};

export default Comment;