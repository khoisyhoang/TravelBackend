const router = require('express').Router();
const multer  = require('multer')


const categoryController = require('../../controllers/admin/category.controller');
const cloudinaryHelper = require('../../helpers/cloudinary.helper');

const upload = multer({ storage: cloudinaryHelper.storage });
const categoryValidate = require('../../validate/admin/category.validate');


router.get('/list', categoryController.list);
router.get('/create', categoryController.create);
router.post('/create', upload.single('avatar'), categoryValidate.createPost ,categoryController.createPost); // 'avatar': key chứa blob
router.get('/edit/:id', categoryController.edit); 
router.patch('/edit/:id', upload.single('avatar'), categoryValidate.createPost, categoryController.editPatch); 

module.exports = router;
