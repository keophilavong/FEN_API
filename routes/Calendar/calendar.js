const express = require('express');
const { check, body } = require('express-validator');
const router = express.Router();
const multer = require('multer');

const calendarController = require('../../controllers/Calendar/calendarController')

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

    cb(uploadError, 'public/uploads/calendar')
  //   console.log(cb)
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('_');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}_${Date.now()}.${extension}`)
  }
})

const uploadOptions = multer({ storage: storageCustom })

router.get('/', calendarController.index);
router.get('/all', calendarController.getAll)
router.get('/get/:id', calendarController.getByID)
router.post('/insert', uploadOptions.fields([{name: 'cover', maxCount: 1}]), 
// [
//   body('category').not().isEmpty().withMessage('Please input category field'),
//   body('semester').not().isEmpty().withMessage('Please input semester field'),
// ],
 calendarController.insert)
router.delete('/delete/:id', calendarController.deleteById)
router.post('/update/:id', uploadOptions.fields([{name: 'cover', maxCount: 1}]), 
// [
//   body('category').not().isEmpty().withMessage('Please input category field'),
//   body('semester').not().isEmpty().withMessage('Please input semester field'),
// ],
 calendarController.update)

module.exports = router;