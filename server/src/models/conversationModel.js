const { Schema, Types, model } = require('mongoose');

const conversationSchema = new Schema(
  {
    recipients: [
      {
        type: Types.ObjectId,
        ref: 'user',
      },
    ],
    text: String,
    media: Array,
    call: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = model('conversation', conversationSchema);
