const router = require('express').Router();

const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

router
  .route('/posts')
  .post(auth, postController.createPost)
  .get(auth, postController.getPost);

router.route('/post/:id').patch(auth, postController.updatePost);

module.exports = router;
