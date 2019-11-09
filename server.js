const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
const users = require("./routes/api/users");

const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
// const db = require("./congfig/keys");

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/neonraindb'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
// Connect to MongoDB
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));


///////////







