const { Op, QueryTypes } = require("sequelize");
const { Hotel, Room, RoomNumber, BookingDate } = require("../models");

const createHotel = async (req, res) => {
  const { name, type, city, address, distance, title, desc, cheapestPrice } =
    req.body;
  try {
    const newHotel = await Hotel.create({
      name,
      type,
      city,
      address,
      distance,
      title,
      desc,
      cheapestPrice,
    });
    res.status(201).send(newHotel);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAll = async (req, res) => {
  const { featured, min, max, limit, city } = req.query;

  try {
    if (featured) {
      const listHotel = await Hotel.findAll({
        include: {
          model: Room,
          as: "rooms",
          include: {
            model: RoomNumber,
            as: "roomNumbers",
            include: {
              model: BookingDate,
              as: "dates",
            },
          },
        },

        limit: parseInt(limit) | (await Hotel.count()),
        where: {
          featured: !!featured,
          //   :{
          //   [Op.eq]: !!featured || [Op.or]:[true,false]

          // } },
          cheapestPrice: {
            [Op.and]: {
              [Op.gte]: parseInt(min) || (await Hotel.min("cheapestPrice")),
              [Op.lte]: parseInt(max) || (await Hotel.max("cheapestPrice")),
            },
          },
        },
      });
      res.status(200).send(listHotel);
    } else if (city) {
      const listHotel = await Hotel.findAll({
        include: {
          model: Room,
          as: "rooms",
          include: {
            model: RoomNumber,
            as: "roomNumbers",
            include: {
              model: BookingDate,
              as: "dates",
            },
          },
        },
        limit: parseInt(limit) | (await Hotel.count()),
        where: {
          city,

          cheapestPrice: {
            [Op.and]: {
              [Op.gte]: parseInt(min) || (await Hotel.min("cheapestPrice")),
              [Op.lte]: parseInt(max) || (await Hotel.max("cheapestPrice")),
            },
          },
        },
      });

      res.status(200).send(listHotel);
    } else {
      const listHotel = await Hotel.findAll({
        // include: {
        //   model: Room,
        //   // include: {
        //   //   model: RoomNumber,
        //   //   // include: [ /* etc */ ]
        //   // }
        // },
        include: {
          model: Room,
          as: "rooms",
          include: {
            model: RoomNumber,
            as: "roomNumbers",
            include: {
              model: BookingDate,
              as: "dates",
            },
          },
        },
        limit: parseInt(limit) || (await Hotel.count()),
        where: {
          cheapestPrice: {
            [Op.and]: {
              [Op.gte]: parseInt(min) || (await Hotel.min("cheapestPrice")),
              [Op.lte]: parseInt(max) || (await Hotel.max("cheapestPrice")),
            },
          },
        },
      });
      res.status(200).send(listHotel);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await Hotel.findByPk(id, {
      include: {
        model: Room,
        as: "rooms",
        include: {
          model: RoomNumber,
          as: "roomNumbers",
          include: {
            model: BookingDate,
            as: "dates",
          },
        },
      },
    });
    res.status(200).send(detail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      city,
      address,
      distance,
      title,
      desc,
      cheapestPrice,
      rooms,
      featured,
      rating,
    } = req.body;
    await Hotel.update(
      {
        name,
        type,
        city,
        address,
        distance,
        title,
        desc,
        cheapestPrice,
        rooms,
        featured,
        rating,
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

const deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    await Hotel.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Delete Success!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.count({
          where: { city },
        });
      })
    );
    console.log(list);
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.count({
      where: {
        type: "hotel",
      },
    });
    const apartmentCount = await Hotel.count({
      where: {
        type: "apartments",
      },
    });
    const resortCount = await Hotel.count({
      where: {
        type: "resorts",
      },
    });
    const villaCount = await Hotel.count({
      where: {
        type: "villas",
      },
    });
    const cabinCount = await Hotel.count({
      where: {
        type: "cabins",
      },
    });
    res.status(200).send([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

const getHomeRooms = async (req, res, next) => {
  const { hotelId } = req.params;
  try {
    const detail = await Room.findByPk(hotelId, {
      include: ["hotelId", "roomNumbers"],
    });
    res.status(200).send([detail]);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createHotel,
  getAll,
  getDetailHotel,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHomeRooms,
};
