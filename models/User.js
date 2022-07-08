const { DataTypes } = require("sequelize");

const createUserlModel = (sequelize) => {
  return sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: { isEmail: true },
        unique: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { tableName: "users", timestamps: true }
  );
};

module.exports = {
  createUserlModel,
};
