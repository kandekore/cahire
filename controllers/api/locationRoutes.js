const router = require("express").Router();
const { Location, Car } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const locationData = await Location.findAll({
      include: [Car],
    });

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("location/:id", async (req, res) => {
  try {
    const locationData = await Location.findOne({
      where: {
        id: req.params.id,
      },

      include: [Location],
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
