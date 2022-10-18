const router = require("express").Router();
const apiRoutes = require("./api");
const { User, Car, Location, Bookings } = require("../models");
const { findAll } = require("../models/Location");
const withAuth = require("../utils/auth");
router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  try {
    console.log("hello");
    let userData = await User.findAll();
    let users = userData.map((user) => user.get({ plain: true }));
    let locationData = await Location.findAll();
    let locations = locationData.map((branch) => branch.get({ plain: true }));
    console.log(users);
    console.log(locations);
    res.render("homepage", {
      users,
      locations,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/car", async (req, res) => {
  try {
    let carData = await Car.findAll();
    let cars = carData.map((vehicles) => vehicles.get({ plain: true }));

    res.render("car", {
      cars,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/bookings/:id", async (req, res) => {
  try {
    const bookingData = await Bookings.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const booking = bookingData.get({ plain: true });

    res.render("booking", {
      ...booking,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/booking", async (req, res) => {
  try {
    let bookingData = await Bookings.findAll();
    let bookings = bookingData.map((book) => book.get({ plain: true }));
    console.log(req.session.logged_in);
    res.render("booking", {
      bookings,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/location", async (req, res) => {
  try {
    let locationData = await Location.findAll();
    let locations = locationData.map((branch) => branch.get({ plain: true }));
    console.log(req.session.logged_in);
    res.render("location", {
      locations,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/car/:id", withAuth, async (req, res) => {
  try {
    const carDataSingle = await Car.findByPk(req.params.id);
    console.log(carDataSingle);
    const carSingle = carDataSingle.get({ plain: true });
    console.log("Single", carSingle.brand);

    res.render("carsingle", carSingle);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/location/:id", withAuth, async (req, res) => {
  try {
    const locationDataSingle = await Car.findAll({
      where: { location_id: req.params.id },
    });

    console.log(locationDataSingle);

    const locationCars = locationDataSingle.map((results) =>
      results.get({ plain: true })
    );

    console.log(locationCars);

    res.render("locationsingle", { locationCars });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },

      include: [{ model: Bookings }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route

  if (req.session.logged_in) {
    res.redirect("/location");
    return;
  }

  res.render("login");
});

module.exports = router;
