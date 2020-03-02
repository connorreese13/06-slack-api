// Require
const Channels = require("../models/channels");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Routes
router.post("/", (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (error, verify) => {
    if (verify) {
      Channels.create(req.body)
        .then(channel => {
          res.send(channel);
        })
        .catch(err => res.send(err));
    } else {
      res.send({ message: "Not authorized" });
    }
  });
});

router.get("/", (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (error, verify) => {
    if (verify) {
      Channels.find(req.query)
        .lean()
        .then(channels => {
          res.send(channels);
        })
        .catch(err => res.send(err));
    } else {
      res.send({ message: "Not authorized" });
    }
  });
});

// Export
module.exports = router;
