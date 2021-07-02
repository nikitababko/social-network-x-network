const { Schema, Types, model } = require('mongoose');

const commentSchema = new Schema(
  {
    //
  },
  {
    timestamps: true,
  }
);

module.exports = model('comment', commentSchema);
