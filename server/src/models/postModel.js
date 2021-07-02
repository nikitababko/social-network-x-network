const { Schema, Types, model } = require('mongoose');

const postSchema = new Schema(
  {
    content: String,
    images: {
      type: Array,
      required: true,
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: 'user',
      },
    ],
    comments: [
      {
        type: Types.ObjectId,
        ref: 'comment',
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('post', postSchema);
