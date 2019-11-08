
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const GameStateSchema = new Schema({
  winCount: {
    type: Integer,
    required: true
  },
  userDeck: {
    type: [],
    required: true
  },
  username: {
    type: String,
    required: true
  },

});
module.exports = GameState = mongoose.model("gamestate", GameStateSchema);