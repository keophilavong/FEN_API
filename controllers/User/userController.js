const User = require('../../models/User/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');

exports.index = (req, res, next) => {
    res.status(200).json({
        message: "User Route is everything OK"
    })
}
// Get All User List
exports.getAll = async (req, res, next) => {
    const users = await User.find().select('name email role').sort({ _id: -1 });
  
    res.status(200).json({
      data: users,
    });
};

//Register
exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
  
    try {
      //Validation Email
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Data Format are not correct');
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
      }
  
      //check email ຊໍ້າ
      const existEmail = await User.findOne({ email: email });
      if (existEmail) {
        const error = new Error('This Email has exist, Please Try Agin');
        error.statusCode = 400;
        throw error;
      }
  
      let user = new User();
      user.name = name;
      user.email = email;
      user.password = await user.encryptPassword(password);
  
      await user.save();
  
      return res.status(201).json({
        message: 'Register Successfully',
      });
    } catch (error) {
      next(error);
    }
};

// Login
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      //check ວ່າມີ email ນີ້ໃນລະບົບບໍ່
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error('Not Found This User');
        error.statusCode = 404;
        throw error;
      }
  
      //ກວດສອບລະຫັດຜ່ານວ່າຕົງກັນຫຼ່ືບໍ່ ຖັາບໍ່ຕົງໃຫ້ໂຍນ Error ອອກໄປ
      const isValid = await user.checkPassword(password);
      if (!isValid) {
        const error = new Error('Password not correct');
        error.statusCode = 401;
        throw error;
      }
  
      //ສ້າງ token jwt ເພື່ອກວດສອບກັບ server
      const token = await jwt.sign(
        {
          id: user._id, //save to payload
          role: user.role, //save to payload
        },
        config.JWT_SECRET,
        { expiresIn: '7 days' } //Expire token time
      );
  
      //decode ວັນໝົດອາຍຸ (type data is timestamp)
      const expires_in = jwt.decode(token);
  
      return res.status(200).json({
        access_token: token,
        expires_in: expires_in.exp, //expire day with decode to timestamp
        token_type: 'Bearer', //for tell fontend for send data to header
      });
    } catch (error) {
      next(error);
    }
};

//get profile
exports.me = (req, res, next) => {
    const { _id, name, email, role } = req.user;
    return res.status(200).json({
      user: {
        id: _id,
        name: name,
        email: email,
        role: role,
      },
    });
};