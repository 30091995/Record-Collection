const express = require("express");
const mongoose = require("mongoose");
const recordRoutes = express.Router()
const Record = require("../models/record-model");


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

module.exports = recordRoutes




