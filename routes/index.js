const express = require("express");
const { router: hotelRouter } = require("./hotels");
const { router: authRouter } = require("./auth");
const { router: userRouter } = require("./users");
const { router: roomRouter } = require("./rooms");
const { router: roomNumberRouter } = require("./roomNumber");
const { router: bookingDateRouter } = require("./BookingDate");
const router = express.Router();

// router.use("/students",studentRouter);
router.use("/hotel", hotelRouter);
router.use("/", authRouter);
router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/roomNumber", roomNumberRouter);
router.use("/bookingDate", bookingDateRouter);

module.exports = router;
