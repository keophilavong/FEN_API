const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const careerController = require('../../controllers/Career/careerController')

router.get('/', careerController.index)
router.get('/all', careerController.getAll)
router.get('/get/:id', careerController.getByID)
router.post('/insert', [
    body('title').not().isEmpty().withMessage('Please input title field'),
    body('link').not().isEmpty().withMessage('Please input link field'),
  ], careerController.insert)
router.delete('/delete/:id', careerController.deleteById)
router.post('/update/:id', [
  body('title').not().isEmpty().withMessage('Please input title field'),
  body('link').not().isEmpty().withMessage('Please input link field'),
], careerController.update)

module.exports = router;