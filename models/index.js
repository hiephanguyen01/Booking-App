const { Sequelize } = require("sequelize");
const { DB, HOST, PASSWORD, USER, dialect } = require("../configs/db.config");
const { createBookingDateModel } = require("./BookingDate");
const { createHotelModel } = require("./Hotel");
const { createRoomModel } = require("./Room");
const { createRoomNumberModel } = require("./RoomNumber");
const { createUserlModel } = require("./User");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect,
});

const Hotel = createHotelModel(sequelize);
const User = createUserlModel(sequelize);
const Room = createRoomModel(sequelize);
const RoomNumber = createRoomNumberModel(sequelize);
const BookingDate = createBookingDateModel(sequelize);

Hotel.hasMany(Room, { as: "rooms" });
Room.belongsTo(Hotel, { foreignKey: "id", as: "hotelId" });

Room.hasMany(RoomNumber, { as: "roomNumbers" });
RoomNumber.belongsTo(Room, { foreignKey: "id", as: "roomId" });

RoomNumber.hasMany(BookingDate, { as: "dates" });
BookingDate.belongsTo(RoomNumber, { foreignKey: "id", as: "roomNumberId" });

module.exports = {
  sequelize,
  Hotel,
  User,
  Room,
  RoomNumber,
  BookingDate,
};
