const { DataTypes } = require("sequelize");

const createBookingDateModel = (sequelize) => {
  return sequelize.define(
    "BookingDates",
    {
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
    },
    { tableName: "BookingDates", timestamps: false }
  );
};

module.exports = {
  createBookingDateModel,
};
