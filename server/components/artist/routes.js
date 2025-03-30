const express = require("express");
const router = express.Router();

const { getAllArtists, getAllEvents, addEventInBulk, addArtistInBulk } = require("./controller");

// render the artists
router.get("/", getAllArtists)

// Render the Events
router.get("/events", getAllEvents)

// Add artist in bulk
router.post("/events/addBulk", addEventInBulk)

// add artists in bulk
router.post("/addbulk", addArtistInBulk);

module.exports = router;