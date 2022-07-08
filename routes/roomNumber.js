const express = require("express");
const {
  createRoomNumber,
  getDetailNumberRoom,
} = require("../controllers/roomNumber.controller");

const router = express.Router();

router.post("/", createRoomNumber);
router.get("/:id", getDetailNumberRoom);

module.exports = {
  router,
};
