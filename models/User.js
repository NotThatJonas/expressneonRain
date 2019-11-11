
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  winCount: [
    {
      type: Schema.Types.ObjectId,
      ref: "winCount"
    }
  ],
  userDeck: [
    {
      type: Schema.Types.ObjectId,
      ref: "userDeck"
    }
  ]
});
module.exports = User = mongoose.model("users", UserSchema);


