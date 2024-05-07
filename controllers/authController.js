const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

exports.register = async (req, res) => {
  const {
    aadhaarNumber,
    name,
    email,
    password,
    dateOfBirth,
    mobileNumber,
    district,
    subDistrict,
    role,
    category,
    subCategory,
    username,
  } = req.body;

  try {
    // Check for existing Aadhaar number
    const aadhaarExists = await User.findOne({ aadhaarNumber });
    if (aadhaarExists) {
      return res.status(400).json({ message: 'Aadhaar number already registered' });
    }

    // Check for existing email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check for existing username
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    const newUser = new User({
      aadhaarNumber,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      mobileNumber,
      district,
      subDistrict,
      role,
      category,
      subCategory,
      username,
    });

    // Save the user to the database
    await newUser.save();

    // Create token
    const payload = { user: { id: newUser.id } };
    const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 });

    // Respond with token and success message
    res.status(201).json({
      message: 'User registered successfully',
      token: token  // Send token back in the response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
