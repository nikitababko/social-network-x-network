const Users = require('../models/userModel');

const userController = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
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
      const user = await Users.findById(req.params.id)
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

      await Users.findByIdAndUpdate(
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
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user._id,
      });

      if (user.length > 0) {
        return res.status(500).json({
          message: 'You followed this user.',
        });
      }

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { followers: req.user._id } },
        { new: true }
      );

      await Users.findOneAndUpdate(
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
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { followers: req.user._id } },
        { new: true }
      );

      await Users.findOneAndUpdate(
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

  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 10;

      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: 'users',
            localField: 'followers',
            foreignField: '_id',
            as: 'followers',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'following',
            foreignField: '_id',
            as: 'following',
          },
        },
      ]).project('-password');

      return res.json({
        users,
        result: users.length,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = userController;
