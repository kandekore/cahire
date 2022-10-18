const sequelize = require("../config/connection");
const { User, Car, Location, Bookings } = require("../models");

const userData = require("./userData.json");
const carData = require("./carData.json");
const locationData = require("./locationData.json");
const bookingData = require("./bookingData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const location = await Location.bulkCreate(locationData, {
    individualHooks: true,
    returning: true,
  });

  for (const car of carData) {
    await Car.create({
      ...car,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      location_id: location[Math.floor(Math.random() * location.length)].id,
    });
  }

  const bookings = await Bookings.bulkCreate(bookingData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
