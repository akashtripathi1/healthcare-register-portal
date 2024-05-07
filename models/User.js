const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  aadhaarNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  mobileNumber: { type: String, required: true },
  district: { type: String, required: true },
  subDistrict: { type: String },
  role: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  username: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;