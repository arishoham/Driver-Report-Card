const { query } = require('express');
const db = require('../db/db');
//bringing in the object we exported that has a .query method to query the pool

const likeController = {};

//pst a comment
likeController.addLike = async (req, res, next) => {
  try {
    const id = req.params.id;
    //add to like table, if successful increment count in comments table 
    const sqlQueryLike = `
    INSERT INTO Likes (username, comment_id)
    VALUES ($1, $2);
    `;
    await db.query(sqlQueryLike,[res.locals.username, id]);
    const sqlQueryComment = `
    Update Comments
    Set like_count = like_count + 1
    Where _id = $1
    `;
    await db.query(sqlQueryComment,[id]);
    next();
  } catch(err) {
    return next({
      log: `Cannot like comment Err: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

//Delete a comment
likeController.deleteLike = async (req, res, next) => {
  try {
    const id = req.params.id;
    //add to like table, if successful increment count in comments table 
    const sqlQueryLike = `
    DELETE FROM Likes
    WHERE username = $1 AND comment_id = $2
    `;
    const data = await db.query(sqlQueryLike,[res.locals.username, id]);
    if(data.rowCount === 1) {
      const sqlQueryComment = `
      Update Comments
      Set like_count = like_count - 1
      Where _id = $1
      `;
      await db.query(sqlQueryComment,[id]);
      next();
    } else {
      throw('no like to unlike');
    }
  } catch(err) {
    return next({
      log: `Cannot unlike comment Err: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = likeController;
