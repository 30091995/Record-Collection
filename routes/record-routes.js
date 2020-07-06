const express = require("express");
const recordRoutes = express.Router()
const Record = require("../models/record-model");
const axios = require ('axios')


recordRoutes.use((req, res, next) => {
  if (req.isAuthenticated() /* && req.user.verifiedEmail === true */) {
    next();
  } else {
    res.status(402).json({message: "Please login to view this content" });
  }
});

recordRoutes.get('/records', (req, res, next) => {
  Record.find().then( allRecords => {
    res.json(allRecords)
  })
})

recordRoutes.post('/records', (req, res, next) => {
  const { artist, title, imgUrl, recordId, userId } = req.body
  Record.findOne({ title }).then((record) => {
    if(record !== null)
    {
      if(record.owners.includes(userId) === false)
      {
        record.owners.push(userId)
        record.save()
      }
      else
      {
        res.json({
          saved: null
        })
      }
    }
    else if (record === null)
    {
      Record.create({
        artist,
        title,
        imgUrl
      })
      .then((savedRecord) => {
        savedRecord.owners.push(userId)
        savedRecord.save()
        res.json({
          saved: savedRecord
        })
      })
    }
  })
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

recordRoutes.get("/showReleases/:artistId", (req, res, next) => {

  let url = 'https://api.discogs.com/artists/' + req.params.artistId + "/releases" +
  `?key=${process.env.DISCOGS_CONSUMER_KEY}&secret=${process.env.DISCOGS_CONSUMER_SECRET}`

  axios
  .get(url)
  .then((response) => {
    res.json(response.data)
  })
})

recordRoutes.put("/deleterecord/:recordTitle", (req, res, next) => {
  const recordTitle = req.params.recordTitle
  console.log(recordTitle)
  Record.findOneAndUpdate({title :recordTitle }, { $pull : {owners : req.user.id}})
  .then((record) => {
    console.log(record)
  })
})


// scanRecod route
recordRoutes.get("/scanRecord/:barcode", (req, res, next) => {
  axios
    .get(
      `https://api.discogs.com/database/search?&key=${process.env.DISCOGS_CONSUMER_KEY}&secret=${process.env.DISCOGS_CONSUMER_SECRET}&barcode=` +
        req.params.barcode
    )
    .then((response) => {
      res.json(response.data.results);
    });
});

module.exports = recordRoutes




