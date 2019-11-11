
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const userDeckSchema = new Schema({

  userDeck: {
    type: [],
    required: true
  }

});
module.exports = userDeck = mongoose.model("userDeck", userDeckSchema);