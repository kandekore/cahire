const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Bookings } = require("../../models");

router.post("/", withAuth, async (req, res) => {
  try {
    const newBooking = await Bookings.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBooking);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const bookingData = await Booking.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!bookingData) {
      res.status(404).json({ message: "No booking found with this id!" });
      return;
    }

    res.status(200).json(bookingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
