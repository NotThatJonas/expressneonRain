
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const userDeckSchema = new Schema({
  id: {
    required: true,
    type: mongoose.SchemaTypes.Number
  },
  name: {
    required: true,
    type: mongoose.SchemaTypes.String
  },
  damage: {
    type: mongoose.SchemaTypes.String
  },
  image: {
    required: true,
    type: mongoose.SchemaTypes.String
  },
  text: {
    required: true,
    type: mongoose.SchemaTypes.String
  },
  type: {
    required: true,
    type: mongoose.SchemaTypes.String
  },
  armor: {
    type: mongoose.SchemaTypes.Number
  },
  selfdamage: {
    type: mongoose.SchemaTypes.Number
  },
  multiplier: {
    type: mongoose.SchemaTypes.Number
  },
  healValue: {
    type:mongoose.SchemaTypes.Number
  }
  
 
});
module.exports = userDeckSchema;