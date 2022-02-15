const express = require('express');

const sessionController = require('../controllers/sessionController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');

const router = express.Router();

//get car info & comments
router.get('/', commentController.getComments, 
  (req, res) => res.status(200).json(res.locals)
);

//add comment
router.post('/comment', sessionController.isLoggedIn, commentController.addComment,
  (req, res) => res.status(200).json(req.body)
);

//delete comment (verify it's the user's comment)
router.delete('/comment/:id', sessionController.isLoggedIn, commentController.deleteComment,
  (req, res) => res.status(200).send('comment deleted!')
);

//add a like (to a comment)
router.post('/like',
  (req, res) => res.status(200).json(res.locals)
);

//remove a like
router.delete('/like',
  (req, res) => res.status(200).json(res.locals)
);


module.exports = router;
