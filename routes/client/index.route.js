const router = require('express').Router();
const tourRoutes = require('./tour.route');
const homeRoutes = require('./home.route');
const CartRoutes = require('./cart.route');

router.use('/tours', tourRoutes);
router.use('/', homeRoutes);
router.use('/cart', CartRoutes);

module.exports = router;