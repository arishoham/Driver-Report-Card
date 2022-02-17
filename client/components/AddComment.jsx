import React from 'react';

const AddComment = ({comment, handleCommentChange, handleSubmitComment}) => {
  return (
    <form onSubmit={handleSubmitComment}>
      <label>
        {'Comment: '}
        <input 
          type="text" 
          name="comment" 
          value={comment}
          onChange={handleCommentChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default AddComment;