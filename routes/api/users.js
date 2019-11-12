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

  router.get("/get/gamestate", (req, res)=> {
    User.findOne({username: req.body.username}, {userDeck: req.body.userDeck, winCount:req.body.winCount}).then(user => {
      console.log(user);
      res.json(User)
      if (!user) {
          return res.status(400).json({msg: "did not grab"});
        } 
        return res.status(200).json({success:true})
      
  })
})

//post deck and the username
//on route define /battlepage logic
//mongoose find one username
//moongoose put where username and deck are vairables

//user.findone ({username: select _id})
//schema.find User.find({username: username}) <gets entire object> 
//user.id pass that into the put request so userdeck can be joined

//Axios find one then(user => { user.update //post/updateuser
//req.body.userdeck

  router.post("/post/gamestate", (req, res) => {
   
    User.findOneAndUpdate( { username: req.body.username }, { userDeck: req.body.userDeck, winCount:req.body.winCount }).then(user => {
            
            if (!user) {
                return res.status(400).json({msg: "unable to save"});
              } 
              return res.status(200).json({success:true})

    })

  })


  module.exports = router;

/////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
// // Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");
// // Load User model
// const User = require("../../models/User");

// // @route POST api/users/register
// // @desc Register user
// // @access Public
// router.post("/register", (req, res) => {
//     // Form validation
//   const { errors, isValid } = validateRegisterInput(req.body);
//   // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//   User.findOne({ username: req.body.username }).then(user => {
//       if (user) {
//         return res.status(400).json({ username: "Username already exists" });
//       } else {
//         const newUser = new User({
//           username: req.body.username,
//           password: req.body.password
//         });
//   // Hash password before saving in database
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => res.json(user))
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   });

//   // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post("/login", (req, res) => {
//     // Form validation
//   const { errors, isValid } = validateLoginInput(req.body);
//   // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//   const username = req.body.username;
//     const password = req.body.password;
//   // Find user by email
//     User.findOne({ username }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ usernamenotfound: "Username not found" });
//       }
//   // Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };
//   // Sign token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               });
//             }
//           );
//         } else {
//           return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//       });
//     });

   
//   });

//   router.get("/get/gamestate", (req, res)=> {
//     User.findOne({username: req.body.username}, {userDeck: req.body.userDeck, winCount:req.body.winCount}).then(user => {
//       console.log(user);
//       res.json(User)
//       if (!user) {
//           return res.status(400).json({msg: "did not grab"});
//         } 
//         return res.status(200).json({success:true})
      
//   })
// })

//   router.post("/post/gamestate", (req, res) => {
   
//     User.findOneAndUpdate( { username: req.body.username }, { userDeck: req.body.userDeck, winCount:req.body.winCount }).then(user => {
//             console.log(user);
//             if (!user) {
//                 return res.status(400).json({msg: "unable to save"});
//               } 
//               return res.status(200).json({success:true})

//     })

//   })

//   // router.post("/", function(req, res) {
//   //   // Create an Jokes with the data available to us in req.body
//   //   if(!req.session.user){
//   //     // res.redirect("/auth/login")
//   //     res.send("you must login to post!")
//   //   } else{
//   //   db.Jokes.create({
//   //     joke: req.body.joke,
//   //     UserId: req.session.user.id
//   //   }).then(function(dbJokes) {
//   //     res.json(dbJokes);
//   //   });
//   // }
//   // });


//   module.exports = router;