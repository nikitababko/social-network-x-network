const Comments = require('../models/commentModel');
const Posts = require('../models/postModel');

const commentController = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;

      const post = await Posts.findById(postId);
      if (!post) {
        return res.status(400).json({
          message: 'This post does not exist.',
        });
      }

      if (reply) {
        const comment = await Comments.findById(reply);
        if (!comment) {
          return res.status(400).json({
            message: 'This comment does not exist.',
          });
        }
      }

      const newComment = new Comments({
        user: req.user._id,
        content,
        tag,
        reply,
        postUserId,
        postId,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();

      res.json({ newComment });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  updateComment: async (req, res) => {
    try {
      const { content } = req.body;

      await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        {
          content,
        }
      );

      res.json({ message: 'Update success!' });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  likeComment: async (req, res) => {
    try {
      const comment = await Comments.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (comment.length > 0) {
        return res.status(400).json({
          message: 'You liked this comment.',
        });
      }

      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ message: 'Liked comment!' });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  unLikeComment: async (req, res) => {
    try {
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ message: 'UnLiked comment!' });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comments.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { postUserId: req.user._id }],
      });

      await Posts.findOneAndUpdate(
        { _id: comment.postId },
        {
          $pull: { comments: req.params.id },
        }
      );

      res.json({ message: 'Deleted comment!' });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = commentController;
