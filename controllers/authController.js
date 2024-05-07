const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

exports.register = async (req, res) => {
  try {
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

    // Check if the user with the provided Aadhaar number already exists
    const existingUser = await User.findOne({ aadhaarNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this Aadhaar number already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
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
    const payload = {
      user: {
        id: newUser.id // Use the ID from the user that was just saved
      }
    };

    // Sign the token
    const token = jwt.sign(
      payload,
      config.get('jwtSecret'), // Ensure you have 'jwtSecret' defined in your config
      { expiresIn: 3600 } // Token expires in 1 hour
    );

    res.status(201).json({
      message: 'User registered successfully',
      token: token  // Send token back in the response
    });

    // res.status(201).json({ message: 'User registered successfully' });
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
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

