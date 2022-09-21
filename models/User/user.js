const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true, trim: true, minlength: 8 },
    role: { type: String, default: 'admin' },
  },
  {
    collection: 'users',
  }
);

//hash password
schema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(5);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

//compare password in systems with bcrypt.js
schema.methods.checkPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid; //return true or false
};

const User = mongoose.model('User', schema);

module.exports = User;
