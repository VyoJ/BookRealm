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

router.get("/id/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let user = await User.findOne({ userid: req.params.id });
    console.log("user", user);
    if (user != null) {
      return res.status(200).send(user);
    } else {
      return res.status(201).send("Could not find user");
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find the user");
  }
});

router.post("/create", async (req, res) => {
  let user = new User({
    userid: req.body.userid,
    name: req.body.name,
    email: req.body.email,
  });
  console.log(user);
  try {
    let savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Could not create user");
  }
});

module.exports = router;
