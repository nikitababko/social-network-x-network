const Post = require('../models/postModel');

const postController = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;

      if (images.length === 0) {
        return res.status(400).json({
          message: 'Please add your photo.',
        });
      }

      const newPost = new Post({
        content,
        images,
        user: req.user._id,
      });

      await newPost.save();

      res.json({ message: 'Created post!', newPost });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  getPost: async (req, res) => {
    try {
      const posts = await Post.find({
        user: [...req.user.following, req.user._id],
      })
        .sort('-createdAt')
        .populate('user likes', 'avatar username fullname');

      res.json({
        message: 'Success!',
        result: posts.length,
        posts,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          images,
        }
      ).populate('user likes', 'avatar username fullname');

      res.json({
        message: 'Update post!',
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  likePost: async (req, res) => {
    try {
      const post = await Post.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      console.log(post);
      if (post.length > 0) {
        return res.status(400).json({
          message: 'You liked this post.',
        });
      }

      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ message: 'Liked post!' });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  unLikePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ message: 'UnLiked post!' });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = postController;
