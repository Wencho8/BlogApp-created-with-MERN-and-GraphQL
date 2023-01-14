const express = require('express');
const router = express.Router();
const userController = require('../controllers/users-controller');


// POST /users/createUser
router.post('/signup', userController.signup)

// POST /users/login
router.post('/login', userController.login)


module.exports = router;