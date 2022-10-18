const User = require("./User");
const Car = require("./Car");
const Location = require("./Location");
const Bookings = require("./Bookings");

User.hasMany(Car, {
  foreignKey: "car_id",
  onDelete: "CASCADE",
});

User.hasMany(Bookings, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Bookings.belongsTo(User, {
  foreignKey: "user_id",
});

Car.belongsTo(Location, {
  foreignKey: "location_id",
});

module.exports = { User, Car, Location, Bookings };
