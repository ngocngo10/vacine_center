const { AdminService } = require('../services');
const adminService = new AdminService();

async function blockUser(req, res, next) {
  try {
    await adminService.blockUser(req.params.userId);
    res.json({
      message: 'Blocked'
    });
  } catch (error) {
    next(error);
  }
}

async function blockMultiUser(req, res, next) {
  try {
    await adminService.blockMultiUser(req.body.ids);
    res.json({
      message: 'Blocked'
    });
  } catch (error) {
    next(error);
  }
}

async function unblockUser(req, res, next) {
  try {
    const tokens = await authService.unblockUser(req.params.userId);
    res.json({ ...tokens });
  } catch (error) {
    next(error);
  }
}

async function unblockMultiUser(req, res, next) {
  try {
    await adminService.unblockMultiUser(req.body.ids);
    res.json({
      message: 'Blocked'
    });
  } catch (error) {
    next(error);
  }
}

async function statistics(req, res, next) {
  try {
    const statistics = await adminService.statistics(req.query);
    res.json({
      statistics
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  blockUser,
  unblockUser,
  blockMultiUser,
  unblockMultiUser,
  statistics
};
