const { DataTypes } = require("sequelize");
const { Hotel } = require("./index");

const createRoomModel = (sequelize) => {
  return sequelize.define(
    "Rooms",
    {
      title: {
        type: DataTypes.STRING,
        a: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      maxPeople: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // roomNumbers: [
      //   {
      //     number: { type: DataTypes.INTEGER },
      //     unavailableDates: { type: [DataTypes.DATE] },
      //   },
      // ],
    },
    { tableName: "rooms", timestamps: true }
  );
};

module.exports = {
  createRoomModel,
};
