const express = require("express");
const { createHotel, getAll, updateHotel, deleteHotel, getDetailHotel, countByCity, countByType, getHomeRooms } = require("../controllers/hotel.controller");

const router = express.Router();

router.post("/",createHotel);
router.get("/",getAll);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.put("/:id",updateHotel);
router.delete("/:id",deleteHotel);
router.get("/:id",getDetailHotel);

router.get("/room/:hotelId", getHomeRooms);

module.exports = {
  router,
};
