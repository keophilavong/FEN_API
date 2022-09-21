const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const partnerController = require('../../controllers/Partner/partnerController')

router.get('/', partnerController.index)
router.get('/all', partnerController.getAll)
router.get('/get/:id', partnerController.getByID)
router.post('/insert', [
    body('title').not().isEmpty().withMessage('Please input title field'),
    body('link').not().isEmpty().withMessage('Please input link field'),
  ], partnerController.insert)
router.delete('/delete/:id', partnerController.deleteById)
router.post('/update/:id', [
    body('title').not().isEmpty().withMessage('Please input title field'),
    body('link').not().isEmpty().withMessage('Please input link field'),
  ], partnerController.update)

module.exports = router;