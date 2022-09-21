const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const departmentController = require('../../controllers/Research/departmentController')

router.get('/', departmentController.index);
router.get('/all', departmentController.getAll)
router.get('/get/:id', departmentController.getByID)
router.post('/insert', [
    body('department_la').not().isEmpty().withMessage('Please input department_la field'),
    body('department_en').not().isEmpty().withMessage('Please input department_en field'),
  ], departmentController.insert)
router.delete('/delete/:id', departmentController.deleteById)
router.post('/update/:id', [
    body('department_la').not().isEmpty().withMessage('Please input department_la field'),
    body('department_en').not().isEmpty().withMessage('Please input department_en field'),
  ], departmentController.update)

module.exports = router;