const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const categoryController = require('../../controllers/News/categoryController')

router.get('/', categoryController.index)
router.get('/all', categoryController.getAll)
router.get('/get/:id', categoryController.getById)
router.post('/insert', [
    body('category_name').not().isEmpty().withMessage('Please input category_name field'),
  ], categoryController.insert)
router.delete('/delete/:id', categoryController.deleteById)
router.post('/update/:id', [
    body('category_name').not().isEmpty().withMessage('Please input category_name field'),
  ], categoryController.update)

module.exports = router;