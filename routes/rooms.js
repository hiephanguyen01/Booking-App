const express = require("express");
const {
  createRoom,
  getDetailRoom,
  updateRoom,
  deleteRoom,
  getAll,
} = require("../controllers/room.controller");

const router = express.Router();

router.post("/", createRoom);
router.get("/:id", getDetailRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/", getAll);

module.exports = {
  router,
};
