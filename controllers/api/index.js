const router = require("express").Router();
const userRoutes = require("./userRoutes");
const carRoutes = require("./carRoutes");

const locationRoutes = require("./locationRoutes");
const bookingRoutes = require("./bookingRoutes");

router.use("/users", userRoutes);
router.use("/cars", carRoutes);
router.use("/bookings", bookingRoutes);

router.use("./location", locationRoutes);


module.exports = router;
