let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let cartSchema = new Schema({
  bookid: { type: String, required: true },
  // date: { type: Date, required: true },
  // rent_period: { type: Date },
  userid: { type: String, required: true },
  title: { type: String, required: true },
  authors: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  order_type:{type:String,require:true},
  approved: { type: String, default: "Not Approved", required: true },
  date: {
    type: Date,
    default: Date.now
},
// date: { type: String, required: true },
rent_period: {
    type: String, // Change the type to String
    required: true
},
});

module.exports = mongoose.model("Cart", cartSchema);
