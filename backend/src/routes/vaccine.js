const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/index");
const { VaccineController } = require("../controllers");

/* GET users listing. */
router.post(
  "/",
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  VaccineController.create
);
router.get("/", VaccineController.find);
router.get("/:id", VaccineController.findOne);
router.put("/:id", VaccineController.update);
router.delete("/:id", VaccineController.deleteSingle);

module.exports = router;
