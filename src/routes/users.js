const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');


router.get('/register', userController.register);
router.post('/register', userController.store);
router.get('/login', userController.login);
router.post('/login', userController.check);
router.get('/', userController.index);

module.exports = router;
