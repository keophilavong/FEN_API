const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

//for check login module
const passportJWT = require('../../middleware/passportJWT');
//for check rold === "admin" module
const checkAdmin = require('../../middleware/checkAdmin');

const userController = require('../../controllers/User/userController');

router.get('/', userController.index)
router.post('/register', [
    body('name').not().isEmpty().withMessage('Please input name field'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Please input email field')
      .isEmail()
      .withMessage('Please input email correct format'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Please input password field')
      .isLength({ min: 8 })
      .withMessage('Password must have than 8 character'),
], userController.register)

router.post(
    '/login',
    [
      body('email')
        .not()
        .isEmpty()
        .withMessage('Please input email field')
        .isEmail()
        .withMessage('Please input email correct format'),
      body('password')
        .not()
        .isEmpty()
        .withMessage('Please input password field')
        .isLength({ min: 8 })
        .withMessage('Password must have than 8 character'),
    ],
    userController.login
);

router.get('/me', [passportJWT.isLogin], userController.me);

module.exports = router;