var express = require('express');
var router = express.Router();
const { AdminController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

router.put(
  '/block-users/:userId',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  AdminController.blockUser
);

router.put(
  '/unblock-users/:userId',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  AdminController.unblockUser
);

router.put(
  '/block-users',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  AdminController.blockMultiUser
);

router.put(
  '/unblock-users/',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  AdminController.unblockMultiUser
);

module.exports = router;
