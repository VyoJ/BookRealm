const express = require("express");
const router = express.Router();
const Txn = require("../models/txnSchema");

router.get("/", async (req, res) => {
  try {
    let txns = await Txn.find();
    console.log(txns);
    return res.status(200).send(txns);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Could not find any transactions");
  }
});