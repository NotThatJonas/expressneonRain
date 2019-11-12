const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

var currentUser = ""
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        return res.status(400).json({ username: "Username already exists" });
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    console.log(req)
  
    
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const username = req.body.username;
    const password = req.body.password;
  // Find user by email
    User.findOne({ username }).then(user => {
      
      
      // Check if user exists
      if (!user) {
        return res.status(404).json({ usernamenotfound: "Username not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });

   
  });


//post deck and the username
//on route define /battlepage logic
//mongoose find one username
//moongoose put where username and deck are vairables

//user.findone ({username: select _id})
//schema.find User.find({username: username}) <gets entire object> 
//user.id pass that into the put request so userdeck can be joined

//Axios find one then(user => { user.update //post/updateuser
//req.body.userdeck






  router.post("/gamestate", async (req, res) => {

        const { username, userDeck, winCount} = req.body;
        try {
      const savedUser = await User.findOneAndUpdate({username}, {
        $push: {
          userDeck: {
            $each: userDeck
          }
          
        },
        winCount
      }, {new: true})



      res.json({user: savedUser.userView()})

    } catch (err) {
      // do something interesting
    }
  })

  router.get("/gamestate", async (req, res) => {
    try {
      const userInfo  = await User.findOne({username: req.body.username})

      res.json(userInfo)
    } catch (err) {
      //does something
    }
  })

  module.exports = router;



    


    

   
