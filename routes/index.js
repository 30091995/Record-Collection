const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile/:artistname", (req, res, next) => {
  axios
    .get(
      `https://api.discogs.com/database/search?q=` +
        req.params.artistname +
        `&key=${process.env.DISCOGS_CONSUMER_KEY}&secret=${process.env.DISCOGS_CONSUMER_SECRET}`
    )
    .then((response) => {
      console.log(response.data.results);
      res.json(response.data.results);
    });
});

module.exports = router;
