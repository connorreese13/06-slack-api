// Require
const Messages = require("../models/messages");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Routes
//Modify the /messages POST request; instead of using the incoming user _id for the user field, extract the user _id from the incoming "Bearer" token and use that
router.post("/", (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let verify = jwt.verify(token, process.env.SECRET);
  if (verify) {
    req.body.user = verify._id;
    console.log("req.body: ", req.body);
    Messages.create(req.body)
      .then(message => {
        res.send(message);
      })
      .catch(err => res.send(err));
  } else {
    res.send("Not authorized");
  }
});
router.get("/", (req, res) => {
  Messages.find(req.query)
    .populate("user channel")
    .then(messages => {
      res.send(messages);
    })
    .catch(err => res.send(err));
});

// Export
module.exports = router;
