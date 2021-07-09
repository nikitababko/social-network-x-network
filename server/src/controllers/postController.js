const Posts = require('../models/postModel');

class APIfeautures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const postController = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;

      if (images.length === 0) {
        return res.status(400).json({
          message: 'Please add your photo.',
        });
      }

      const newPost = new Posts({
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

  getPosts: async (req, res) => {
    try {
      const features = new APIfeautures(
        Posts.find({
          user: [...req.user.following, req.user._id],
        }),
        req.query
      ).pagination();

      const posts = await features.query
        .sort('-createdAt')
        .populate('user likes', 'avatar username fullname')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });

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

      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          images,
        }
      )
        .populate('user likes', 'avatar username fullname')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });

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
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (post.length > 0) {
        return res.status(400).json({
          message: 'You liked this post.',
        });
      }

      await Posts.findOneAndUpdate(
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
      await Posts.findOneAndUpdate(
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

  getUserPosts: async (req, res) => {
    try {
      const features = new APIfeautures(
        Posts.find({
          user: req.params.id,
        }),
        req.query
      ).pagination();

      const posts = await features.query.sort('-createdAt');

      res.json({
        posts,
        result: posts.length,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id)
        .populate('user likes', 'avatar username fullname')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });

      res.json({ post });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  getPostsDiscover: async (req, res) => {
    try {
      const features = new APIfeautures(
        Posts.find({
          user: { $nin: [...req.user.following, req.user._id] },
        }),
        req.query
      ).pagination();

      const posts = await features.query.sort('-createdAt');

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
