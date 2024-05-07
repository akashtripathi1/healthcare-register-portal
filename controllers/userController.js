const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);  // req.user is the userId

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, category, subCategory } = req.body;

    // Find the user by ID and update their details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, category, subCategory },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID and delete them
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};