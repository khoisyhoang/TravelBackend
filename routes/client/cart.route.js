const router = require('express').Router();
const CartController = require('../../controllers/client/cart.controller');

router.get('/', CartController.cart);
module.exports = router;
