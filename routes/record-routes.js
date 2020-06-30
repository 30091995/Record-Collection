const express = require("express");
const mongoose = require("mongoose");
const recordRoutes = express.Router()
const Record = require("../models/record-model");
const axios = require ('axios')


recordRoutes.get('/records', (req, res, next) => {
  Record.find().then( allRecords => {
    res.json(allRecords)
  })
})

recordRoutes.post('/records', (req, res, next) => {
  const { artist, albumName, notes, imgUrl } = req.body
  Record.create({
    artist,
    albumName,
    notes,
    imgUrl,
    owners : []
  })
  .then((recordToSave) => res.json(recordToSave))
})

recordRoutes.get("/searchArtist/:artistname", (req, res, next) => {
  axios
    .get(
      `https://api.discogs.com/database/search?q=` +
        req.params.artistname +
        `&key=${process.env.DISCOGS_CONSUMER_KEY}&secret=${process.env.DISCOGS_CONSUMER_SECRET}`
    )
    .then((response) => {
      res.json(response.data.results);
    });
});

module.exports = recordRoutes




