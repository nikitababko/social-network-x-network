const { Schema, Types, model } = require('mongoose');

const messageSchema = new Schema(
  {
    conversation: {
      type: Types.ObjectId,
      ref: 'conversation',
    },
    sender: {
      type: Types.ObjectId,
      ref: 'user',
    },
    recipient: {
      type: Types.ObjectId,
      ref: 'user',
    },
    text: String,
    media: Array,
    call: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = model('message', messageSchema);
