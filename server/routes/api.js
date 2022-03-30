const express = require('express');

const sessionController = require('../controllers/sessionController');
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');
const carController = require('../controllers/carController');

const router = express.Router();

//get car info & comments
router.get(
  '/',
  sessionController.isLoggedInOptional,
  commentController.getComments,
  carController.getInfo,
  carController.getImage,
  (req, res) => res.status(200).json(res.locals)
);

//add comment
router.post(
  '/comment',
  sessionController.isLoggedIn,
  commentController.addComment,
  (req, res) => res.status(200).json(req.body)
);

//delete comment (verify it's the user's comment)
router.delete(
  '/comment/:id',
  sessionController.isLoggedIn,
  commentController.deleteComment,
  (req, res) => res.status(200).send('comment deleted!')
);

//add a like (to a comment)
router.post(
  '/like/:id',
  sessionController.isLoggedIn,
  likeController.addLike,
  (req, res) => {
    return res.status(200).json({ status: true });
  }
);

//remove a like
router.delete(
  '/like/:id',
  sessionController.isLoggedIn,
  likeController.deleteLike,
  (req, res) => res.status(200).json(res.locals)
);

//check if user is logged in
router.get('/loggedin', sessionController.isLoggedInOptional, (req, res) =>
  res.status(200).json(res.locals)
);

module.exports = router;
