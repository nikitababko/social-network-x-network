const { Schema, Types, model } = require('mongoose');

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: Object,
    reply: Types.ObjectId,
    likes: [
      {
        type: Types.ObjectId,
        ref: 'user',
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: 'user',
    },
    postId: Types.ObjectId,
    postUserId: Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = model('comment', commentSchema);
