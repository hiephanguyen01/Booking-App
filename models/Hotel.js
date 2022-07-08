const { DataTypes } = require("sequelize");
const { Hotel } = require("./index");

const createHotelModel = (sequelize) => {
  return sequelize.define(
    "Hotels",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      distance: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photos: {
        type: DataTypes.JSON,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 5,
        },
      },
      cheapestPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      featured: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    { tableName: "hotels", timestamps: false }
  );
};

module.exports = {
  createHotelModel,
};
