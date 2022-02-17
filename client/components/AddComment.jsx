import React from 'react';
import {Box, InputAdornment, IconButton, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddComment = ({comment, handleCommentChange, handleSubmitComment}) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      id="add-comment-form"
    >
      <TextField
        id="add-comment"
        label="Comment"
        multiline
        rows={2}
        value={comment}
        onChange={handleCommentChange}
        sx={{ width: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton 
                onClick={handleSubmitComment}
                type="submit"
                color="primary" 
                aria-label="upload picture" 
                component="span">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
};

export default AddComment;