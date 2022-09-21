const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const multer = require('multer');

const researchController = require('../../controllers/Research/researchController');

//New Version Upload Images
const FILE_TYPE_MAP = {
    'application/pdf': 'pdf',
    'application/vnd.ms-powerpoint': 'ppt',
    'text/plain': 'txt',
    'text/csv': 'csv',
    'application/msword': 'doc',
    'pplication/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
}

const storageCustom = multer.diskStorage({
  destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid file type')

      if (isValid) {
        uploadError = null
      }

    cb(uploadError, 'public/uploads/researches')
  //   console.log(cb)
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('_');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}_${Date.now()}.${extension}`)
  }
})

const uploadOptions = multer({ storage: storageCustom })

router.get('/', researchController.index);
router.get('/all', researchController.getAll)
router.get('/get/:id', researchController.getByID)
router.get('/get/filters', researchController.getByTeacher)
router.post('/insert', 
// [
//   body('name_research').not().isEmpty().withMessage('Please input fullname_la field'),
//   body('link').not().isEmpty().withMessage('Please input link field'),
//   body('etc').not().isEmpty().withMessage('Please input position field'),
//   body('teacher').not().isEmpty().withMessage('Please input email field'),
// ],
 uploadOptions.fields([{name: 'research_file', maxCount: 1}]), researchController.insert)
router.delete('/delete/:id', researchController.deleteById)
router.post('/update/:id', 
// [
//   body('name_research').not().isEmpty().withMessage('Please input fullname_la field'),
//   body('link').not().isEmpty().withMessage('Please input link field'),
//   body('etc').not().isEmpty().withMessage('Please input position field'),
//   body('teacher').not().isEmpty().withMessage('Please input email field'),
// ], 
uploadOptions.fields([{name: 'research_file', maxCount: 1}]), researchController.update)

module.exports = router;