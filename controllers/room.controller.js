const { Room, RoomNumber,BookingDate } = require("../models");
const createRoom = async (req, res, next) => {
  const { title, price, maxPeople, desc, HotelId } = req.body;
  console.log(req.body);
  try {
    const newRoom = await Room.create({
      title,
      price,
      maxPeople,
      desc,
      HotelId,
    });
    res.status(201).send(newRoom);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const listRoom = await Room.findAll({
      include: ["roomNumbers", "hotelId"],
    });
    res.status(200).send(listRoom);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getDetailRoom = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const detail = await Room.findAll({
      include:{
        model:RoomNumber,
        as:"roomNumbers",
        include:{
          model:BookingDate,
          as:"dates",
          attributes:["startDate","endDate"]
        }
      },
      where:{
        hotelId:id
      }
    });

    res.status(200).send(detail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, maxPeople, desc, HotelId } = req.body;
    await Room.update(
      {
        title,
        price,
        maxPeople,
        desc,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send(`ID :${id} updated success!`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    await Room.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Delete Success!");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createRoom, getDetailRoom, updateRoom, deleteRoom, getAll };
