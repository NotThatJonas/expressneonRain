
const mongoose = require("mongoose");
const userDeckSchema = require('./userDeck');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  password: {
    type:  mongoose.SchemaTypes.String,
    required: true
  },
  date: {
    type:  mongoose.SchemaTypes.Date,
    default: Date.now
  },
  winCount: {
    type: mongoose.SchemaTypes.Number
  },
  userDeck: {
    type: [userDeckSchema]
  }
});



UserSchema.methods.userView = () => {
  return {
    _id: this._id,
    username: this.username,
    winCount: this.winCount,
    userDeck: this.userDeck
  }
}
module.exports = User = mongoose.model("users", UserSchema);


