const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/", async (req, res) => {
  try {
    let users = await User.find({});
    console.log(users);
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find any users");
  }
});

router.post("/create", async (req, res) => {
  let user = new User({
    userid: req.body.userid,
    name: req.body.name,
    email: req.body.email,
  });
  try {
    let savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Could not create user");
  }
});

module.exports = router;