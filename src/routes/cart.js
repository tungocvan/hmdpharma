const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/', cartController.index);
router.post('/', cartController.index);
router.get('/:id', cartController.index);
router.get('/delete/:id', cartController.delete);
router.post('/update', cartController.updateQuantity);

module.exports = router;
