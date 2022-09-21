const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');

const teacherController = require('../../controllers/Research/teacherController');

//New Version Upload Images
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storageCustom = multer.diskStorage({
  destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type')

      if (isValid) {
        uploadError = null
      }

    cb(uploadError, 'public/uploads/profiles')
  //   console.log(cb)
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('_');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}_${Date.now()}.${extension}`)
  }
})

const uploadOptions = multer({ storage: storageCustom })

router.get('/', teacherController.index)
router.get('/all', teacherController.getAll)
router.get('/get/:id', teacherController.getByID)
router.post('/insert', uploadOptions.fields([{name: 'profile_img', maxCount: 1}]), [
  body('fullname_la').not().isEmpty().withMessage('Please input fullname_la field'),
  body('fullname_en').not().isEmpty().withMessage('Please input fullname_en field'),
  body('position').not().isEmpty().withMessage('Please input position field'),
  body('email').not().isEmpty().withMessage('Please input email field'),
  body('tel').not().isEmpty().withMessage('Please input tel field'),
  body('address').not().isEmpty().withMessage('Please input address field'),
  body('department').not().isEmpty().withMessage('Please input department field'),
], teacherController.insert);
router.delete('/delete/:id', teacherController.deleteById);
router.post('/update/:id', uploadOptions.fields([{name: 'profile_img', maxCount: 1}]), [
  body('fullname_la').not().isEmpty().withMessage('Please input fullname_la field'),
  body('fullname_en').not().isEmpty().withMessage('Please input fullname_en field'),
  body('position').not().isEmpty().withMessage('Please input position field'),
  body('email').not().isEmpty().withMessage('Please input email field'),
  body('tel').not().isEmpty().withMessage('Please input tel field'),
  body('address').not().isEmpty().withMessage('Please input address field'),
  body('department').not().isEmpty().withMessage('Please input department field'),
], teacherController.update)

module.exports = router;