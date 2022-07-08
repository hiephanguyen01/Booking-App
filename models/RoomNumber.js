const { DataTypes } = require("sequelize");

const createRoomNumberModel = (sequelize) => {
  return sequelize.define(
    "RoomNumbers",
    {
      number: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "RoomNumbers", timestamps: true }
  );
};

module.exports = {
  createRoomNumberModel,
};
