const router = require('express').Router();

const notifyController = require('../controllers/notifyController');
const auth = require('../middleware/auth');

router.post('/notify', auth, notifyController.createNotify);

router.delete('/notify/:id', auth, notifyController.removeNotify);

router.get('/notifies', auth, notifyController.getNotifies);

router.patch('/is_read_notify/:id', auth, notifyController.isReadNotify);

router.delete(
  '/delete_all_notify',
  auth,
  notifyController.deleteAllNotifies
);

module.exports = router;
