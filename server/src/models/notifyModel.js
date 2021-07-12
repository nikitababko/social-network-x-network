const { Schema, model, Types } = require('mongoose');

const notifySchema = new Schema(
  {
    id: Types.ObjectId,
    user: {
      type: Types.ObjectId,
      ref: 'user',
    },
    recipients: [Types.ObjectId],
    url: String,
    text: String,
    content: String,
    image: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('notify', notifySchema);
