const express = require('express');
const router = express.Router();

const AdminController = require('../app/controllers/AdminController');

router.get('/menuTop/:id?/:slug?', AdminController.menuTop);
router.post('/menuTop/:id?/:slug?', AdminController.menuTop);
router.get('/order/:id?', AdminController.order);
router.get('/orderDetails/:id?/:slug?', AdminController.orderDetails);
router.get('/account/:slug?/:id?', AdminController.account);
router.post('/updateAccount/:id?/:slug?', AdminController.updateAccount);
router.get('/post/:slug?/:id?/:action?', AdminController.post);
router.post('/post/:slug?/:id?/:action?', AdminController.post);
router.get('/updateProduct/:id?', AdminController.updateProduct);
router.get('/productDelete/:id?', AdminController.productDelete);
router.get('/categoryDelete/:id?', AdminController.categoryDelete);
router.post('/upload', AdminController.upload);
router.post('/checkField', AdminController.checkField);
router.post('/product', AdminController.createProduct);
router.post('/category/:id?', AdminController.createCategory);
router.post('/updateProduct', AdminController.updateProductById);
router.get('/copyProduct/:id?', AdminController.copyProduct);
router.get('/menu', AdminController.menu);
router.get('/product/:id?/:slug?', AdminController.product);
router.get('/footer', AdminController.footer);
router.get('/', AdminController.index);
module.exports = router;
