const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

router.post("/signUp", (req, res) => {
  const { username, password, retypedPassword } = req.body;

  if (password !== retypedPassword) {
    res.send("Passwords do not match");
  } else {
    User.findOne({ username }).then(user => {
        if (user) {
          res.send("User already exists");
        } else {
          bcrypt.hash(password, 12).then(hashedPassword => {
            let newUser = new User({
              username,
              password: hashedPassword
            });
    
            newUser.save().then(() => {
              res.redirect("/");
            });
          });
        }
      });
  }
});

router.post("/logIn", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password).then(success => {
        if (success) {
          req.session.user = user;
          res.redirect("/");
        } else {
          res.send("wrong password");
        }
      });
    } else {
      res.send("no user found");
    }
  });
});

router.post("/logOut", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;