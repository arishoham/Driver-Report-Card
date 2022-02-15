const express = require('express');

const sessionController = require('../controllers/sessionController');
const userController = require('../controllers/userController');

const router = express.Router();

//get sign-up page
router.get('/',
  (req, res) => res.status(200).json(res.locals)
);

//sign up!
router.post('/', userController.addUser, 
  sessionController.startSession,
  (req, res) => res.status(200).json('signed-up!')
);

module.exports = router;