const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

router.get('/', accountController.index);
router.get('/info', accountController.index);

module.exports = router;
