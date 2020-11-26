const express = require('express');
const router = express.Router();

const loginRegisterController = require('../app/controllers/LoginRegisterController');
router.get('/logout', loginRegisterController.logout);
router.post('/', loginRegisterController.register);
router.get('/:slug?/:id?', loginRegisterController.index);

module.exports = router;
