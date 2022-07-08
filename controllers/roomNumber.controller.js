const { RoomNumber } = require("../models");
const createRoomNumber = async (req, res, next) => {
  const { number, RoomId } = req.body;
  console.log(req.body);
  try {
    const newRoom = await RoomNumber.create({
      number,
      RoomId,
    });
    console.log(newRoom);
    res.status(201).send(newRoom);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getDetailNumberRoom = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const detail = await RoomNumber.findByPk(id, {
      include: ["dates"],
    });
    console.log(detail);
    res.status(200).send(detail);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createRoomNumber, getDetailNumberRoom };
