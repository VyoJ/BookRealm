let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  userid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
