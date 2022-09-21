const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const scholarshipController = require('../../controllers/Scholarship/scholarshipController')

router.get('/', scholarshipController.index)
router.get('/all', scholarshipController.getAll)
router.get('/get/:id', scholarshipController.getByID)
router.post('/insert', [
    body('title').not().isEmpty().withMessage('Please input name field'),
    body('link').not().isEmpty().withMessage('Please input name field'),
], scholarshipController.insert)
router.delete('/delete/:id', scholarshipController.deleteById)
router.post('/update/:id', [
    body('title').not().isEmpty().withMessage('Please input name field'),
    body('link').not().isEmpty().withMessage('Please input name field'),
], scholarshipController.update)

module.exports = router;