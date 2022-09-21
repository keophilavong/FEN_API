const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const multer = require('multer');

const newsController = require('../../controllers/News/newsController')

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

    cb(uploadError, 'public/uploads/news')
  //   console.log(cb)
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('_');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}_${Date.now()}.${extension}`)
  }
})

const uploadOptions = multer({ storage: storageCustom })

router.get('/', newsController.index);
router.get('/all', newsController.getAll)
router.get('/filters', newsController.getByCategory)
router.get('/get/:id', newsController.getByID);
router.post('/insert_image', uploadOptions.fields([{name: 'image', maxCount: 1}]), newsController.insertImage), 
router.post('/insert', uploadOptions.fields([{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 9}]), 
// [
//   body('title').not().isEmpty().withMessage('Please input title field'),
//   body('content').not().isEmpty().withMessage('Please input content field'),
//   body('isFeature').not().isEmpty().withMessage('Please input isFeature field'),
//   body('category').not().isEmpty().withMessage('Please input category field'),
// ], 
newsController.insert)
router.delete('/delete/:id', newsController.deleteById)
router.post('/update/:id', uploadOptions.fields([{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 9}]), 
// [
//   body('title').not().isEmpty().withMessage('Please input title field'),
//   body('content').not().isEmpty().withMessage('Please input content field'),
//   body('isFeature').not().isEmpty().withMessage('Please input isFeature field'),
//   body('category').not().isEmpty().withMessage('Please input category field'),
// ],
 newsController.update)

module.exports = router;