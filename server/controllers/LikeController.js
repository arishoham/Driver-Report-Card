const { query } = require('express');
const db = require('../db/db');
//bringing in the object we exported that has a .query method to query the pool

const likeController = {};

//pst a comment
likeController.addLike = (req, res, next) => {
  // write code here
  const sqlQuery = ``;
  db.query(sqlQuery)
    .then(data => {
      res.locals = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Cannot get names from database Err: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

//Delete a comment
likeController.deleteLike = (req, res, next) => {
  const sqlQuery = ``;
  db.query(sqlQuery)
    .then(data => {
      res.locals = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Cannot get names from database Err: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = likeController;
