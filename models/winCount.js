
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const winCountSchema = new Schema({
  winCount: {
    type: Integer,
    required: true
  }

});
module.exports = winCount = mongoose.model("winCount", winCountSchema);