const User = require('../models/userModel');

const userController = {
  searchUser: async (req, res) => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select('fullname username avatar');

      res.json({ users });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select('-password')
        .populate('followers following', '-password');
      if (!user) {
        return res.status(400).json({
          message: 'User does not exist.',
        });
      }

      res.json({ user });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { avatar, fullname, mobile, address, story, website, gender } =
        req.body;
      if (!fullname) {
        return res.status(400).json({
          message: 'Please add your full name',
        });
      }

      await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          fullname,
          mobile,
          address,
          story,
          website,
          gender,
        }
      );

      res.json({
        message: 'Update success!',
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  follow: async (req, res) => {
    try {
      const user = await User.find({
        _id: req.params.id,
        followers: req.user._id,
      });

      if (user.length > 0) {
        return res.status(500).json({
          message: 'You followed this user.',
        });
      }

      await User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { followers: req.user._id } },
        { new: true }
      );

      await User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { following: req.params.id } },
        { new: true }
      );

      res.json({ message: 'Followed user.' });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  unfollow: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { followers: req.user._id } },
        { new: true }
      );

      await User.findOneAndUpdate(
        { _id: req.user.id },
        { $pull: { following: req.params.id } },
        { new: true }
      );

      res.json({ message: 'UnFollow user.' });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = userController;
