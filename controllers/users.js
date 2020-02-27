// Require
const Users = require("../models/users");
const router = require("express").Router();

// Routes
router.post("/signup", (req, res) => {
  Users.find({ email: req.body.email }).then(response => {
    if (response == null) {
      Users.create(req.body).then(response => {
        res.send(response);
      });
    } else {
      res.send("Email already exists");
    }
  });
});

router.post("/login", (req, res) => {});

// Export
module.exports = router;
