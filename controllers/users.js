// Require
const Users = require("../models/users");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Routes
router.post("/signup", (req, res) => {
  Users.findOne({ email: req.body.email }).then(response => {
    if (response == null) {
      let encrypted = bcrypt.hashSync(req.body.password, 10);
      req.body.password = encrypted;
      Users.create(req.body).then(response => {
        let token = jwt.sign(response.toObject(), "secret");
        res.send({ token: token });
      });
    } else {
      res.send("Email already exists");
    }
    console.log(req.body);
  });
});

router.post("/login", (req, res) => {});

// Export
module.exports = router;
