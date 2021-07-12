const Notifies = require('../models/notifyModel');

const notifyCtrl = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;

      if (recipients.includes(req.user._id.toString())) return;

      const notify = new Notifies({
        id,
        recipients,
        url,
        text,
        content,
        image,
        user: req.user._id,
      });

      await notify.save();
      return res.json({ notify });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  removeNotify: async (req, res) => {
    try {
      const notify = await Notifies.findOneAndDelete({
        id: req.params.id,
        url: req.query.url,
      });

      console.log({ notify });

      return res.json({ notify });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.find({ recipients: req.user._id })
        .sort('-createdAt')
        .populate('user', 'avatar username');

      return res.json({ notifies });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = notifyCtrl;
