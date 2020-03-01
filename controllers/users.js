// Require
const Users = require("../models/users");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Routes
router.post("/signup", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(response => {
      if (response == null) {
        let encrypted = bcrypt.hashSync(req.body.password, 10);
        req.body.password = encrypted;
        Users.create(req.body).then(response => {
          let token = jwt.sign(response.toObject(), process.env.SECRET);
          res.send(token);
        });
      } else {
        res.send("Email already exists");
      }
      console.log(req.body);
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/login", (req, res) => {
  Users.findOne({ email: req.body.email })
    .select("email password")
    .then(response => {
      if (response) {
        let match = bcrypt.compareSync(req.body.password, response.password);
        if (match) {
          let user = req.body;
          let token = jwt.sign(user, process.env.SECRET);
          res.send(token);
        } else {
          res.send("wrong password");
        }
      } else {
        res.send("email not found");
      }
      //console.log(req.body);
    })
    .catch(err => {
      res.send(err);
    });
});

// Export
module.exports = router;
