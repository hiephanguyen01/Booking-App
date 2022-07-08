const express = require("express");
const {
  getAll,
  updateUser,
  deleteUser,
  getDetailUser,
} = require("../controllers/user.controller");
const {
  verifyAdmin,
  verifyToken,
  verifyUser,
} = require("../middlewares/auth/verifyToken");

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAll);
router.put("/:id", verifyToken, verifyUser, updateUser);
router.delete("/:id", verifyToken, verifyUser, deleteUser);
router.get("/:id", verifyToken, verifyUser, getDetailUser);

module.exports = {
  router,
};
