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
      }).populate('user likes', 'avatar username fullname');

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
};

module.exports = postController;
