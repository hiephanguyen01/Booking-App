const express = require("express");
const { createBookingDate } = require("../controllers/BookingDate.controller");

const router = express.Router();

router.post("/", createBookingDate);

module.exports = {
  router,
};
