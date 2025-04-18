const router = require('express').Router();
const multer  = require('multer')
const upload = multer() // khoi tao multer?

const categoryController = require('../../controllers/admin/category.controller');

router.get('/list', categoryController.list);
router.get('/create', categoryController.create);
router.post('/create', upload.single('avatar'), categoryController.createPost); // 'avatar': key chứa blob

module.exports = router;
