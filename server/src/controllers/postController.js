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
        newPost,
      });
    }
  },
};

module.exports = postController;
