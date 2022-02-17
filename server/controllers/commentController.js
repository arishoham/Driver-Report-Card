const { query } = require('express');
const db = require('../db/db');
//bringing in the object we exported that has a .query method to query the pool

const commentController = {};


//get all comments for a car
commentController.getComments = async (req, res, next) => {
  try {
    const {pn, ps} = req.query;
    const sqlQuery = `
    SELECT c.*, COUNT(l.username) filter (where l.username = $3) AS like_username FROM comments c
    LEFT OUTER JOIN likes l
      ON _id = comment_id
    WHERE plate_number = $1 AND plate_state = $2
    GROUP BY(c._id)
    ORDER BY created_on DESC;
    `;
    const { rows } = await db.query(sqlQuery,[pn, ps, res.locals.username]);
    res.locals.comments = rows;
    next();

  } catch(err) {
    return next({
      log: `Cannot get comments from database Err: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};


//post a comment
commentController.addComment = async (req, res, next) => {
  try {
    const { comment, plate_number, plate_state } = req.body;
    const sqlQuery = `
    INSERT INTO comments (comment, plate_number, plate_state, username)
    VALUES ($1, $2, $3, $4);
    `;
    await db.query(sqlQuery,[comment, plate_number, plate_state, res.locals.username]);
    next();
  } catch(err) {
    return next({
      log: `Cannot add comment to database Err: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

//Delete a comment
commentController.deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sqlQuery = `
    SELECT username 
    FROM Comments
    WHERE _id = $1
    `;
    const { rows } = await db.query(sqlQuery,[id]);
    console.log(rows[0].username);
    if(rows[0].username === res.locals.username) { // check if the comment username is the same as the JWT
      const sqlQueryDeleteLike = `
      DELETE FROM Likes 
      WHERE comment_id = $1;
      `;
      await db.query(sqlQueryDeleteLike,[id]);
      const sqlQueryDeleteComment = `
      DELETE FROM Comments 
      WHERE _id = $1;
      `;
      await db.query(sqlQueryDeleteComment,[id]);
      next();
    }
    else return res.json('Not your comment to delete');
  } catch(err) {
    return next({
      log: `Cannot delete comment from database Err: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = commentController;
