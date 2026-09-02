const express = require("express");
const router = express.Router();
const {
  reservation,
  getReservations,
} = require("../controllers/reservationController");

router.post("/reservation", reservation);
router.get("/reservation/:studioId", getReservations);

module.exports = router;
