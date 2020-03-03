// Require
const Messages = require("../models/messages");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Routes
//Modify the /messages POST request; instead of using the incoming user _id for the user field, extract the user _id from the incoming "Bearer" token and use that
router.post("/", (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let tokenData = jwt.verify(token, process.env.SECRET);
  if (tokenData) {
    req.body.user = tokenData._id;
    Messages.create(req.body)
      .then(message => {
        Messages.findById(message._id)
          .populate("user channel")
          .then(user => {
            res.send(user);
          });
      })
      .catch(err => res.send(err));
  } else {
    res.send({ message: "Not authorized" });
  }
});

router.get("/", (req, res) => {
  console.log("messages");
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.SECRET, (error, verify) => {
    if (verify) {
      console.log("req.query", req.query);
      Messages.find(req.query)
        .populate("user channel")
        .then(messages => {
          res.send(messages);
        })
        .catch(err => res.send(err));
    } else {
      res.send({ message: "Not authorized" });
    }
  });
});

// Export
module.exports = router;
