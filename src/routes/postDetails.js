const express = require('express');
const router = express.Router();

const postDetailsController = require('../app/controllers/PostDetailsController');

router.get('/:id', postDetailsController.index);

module.exports = router;
