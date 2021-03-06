const express = require("express");
const recordRoutes = express.Router();
const Record = require("../models/record-model");
const axios = require("axios");

recordRoutes.use((req, res, next) => {
  if (req.isAuthenticated() /* && req.user.verifiedEmail === true */) {
    next();
  } else {
    res.status(402).json({ message: "Please login to view this content" });
  }
});

recordRoutes.get("/records", (req, res, next) => {
  Record.find().then((allRecords) => {
    res.json(allRecords);
  });
});

recordRoutes.post("/records", (req, res, next) => {
  const { artist, title, imgUrl, recordMainRelease, userId } = req.body;
  Record.findOne({ title }).then((record) => {
    if (record !== null) {
      if (record.owners.includes(userId) === false) {
        record.owners.push(userId);
        record.save();
        res.json({
          saved: "Record saved",
        });
      } else {
        res.json({
          saved: "Already in collection!",
        });
      }
    } else if (record === null) {
      Record.create({
        artist,
        title,
        imgUrl,
        recordMainRelease,
      }).then((savedRecord) => {
        savedRecord.owners.push(userId);
        savedRecord.save();
        res.json({
          saved: "Record saved",
        });
      });
    }
  });
});

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
  let url =
    "https://api.discogs.com/artists/" +
    req.params.artistId +
    "/releases" +
    `?key=${process.env.DISCOGS_CONSUMER_KEY}&secret=${process.env.DISCOGS_CONSUMER_SECRET}`;

  axios.get(url).then((response) => {
    res.json(response.data);
  });
});

recordRoutes.put("/deleterecord/:record_id", (req, res, next) => {
  const recordId = req.params.record_id;
  Record.findOneAndUpdate(
    { _id: recordId },
    { $pull: { owners: req.user.id } }
  ).then(() => {
    console.log("Done");
    res.json({ msg: "record deleted"})
  });
});

recordRoutes.get("/showSingleRelease/:releaseNumber", (req, res, next) => {
  const releaseNumber = req.params.releaseNumber;
  let url =
    "https://api.discogs.com/releases/" +
    releaseNumber +
    `?key=${process.env.DISCOGS_CONSUMER_KEY}&secret=${process.env.DISCOGS_CONSUMER_SECRET}`;

  axios.get(url).then((release) => {
    res.json(release.data);
  });
});

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

module.exports = recordRoutes;
