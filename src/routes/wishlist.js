const express = require('express');
const router = express.Router();

const wishlistController = require('../app/controllers/WishlistController');

router.get('/', wishlistController.index);

module.exports = router;
