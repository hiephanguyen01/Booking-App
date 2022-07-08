const { BookingDate } = require("../models");
const createBookingDate = async (req, res, next) => {
  const { startDate, endDate, RoomNumberId } = req.body;
  console.log(RoomNumberId);
  if (!RoomNumberId) {
    return next("RoomNumberId is require!");
  }
  try {
    const newDate = await BookingDate.create({
      startDate,
      endDate,
      RoomNumberId,
    });
    console.log(newDate);
    res.status(201).send(newDate);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { createBookingDate };
