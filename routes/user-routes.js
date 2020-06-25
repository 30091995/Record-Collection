const express = require('express');
const userRoutes = express.Router();

//Put passport variables here

const passport = require('passport');
const bcrypt = require('bcryptjs');

//require the user model!!!!


const User = require('../models/user-model.js')

// POST /api/signup (This route sign up a user in the database)

userRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username
  const fullname = req.body.fullname
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }, (err, foundUser) => {

    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'e-Mail taken. Choose another one.' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      email: email,
      password: hashPass,
      username: username,
      fullname: fullname
    });

    aNewUser.save().then(() => {
      // Automatically log in user after sign up
      // .login() here is actually a predefined passport method
      req.login(aNewUser, () => {

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
      });
    });
  });
});


// POST /api/login (this route allows a single user to log in!)
userRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});


//POST /api/logout (This route it's used to log out a user from the application!)

userRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

// React needs this route -> just see if anyone is logged in
userRoutes.get('/checkuser', (req, res, next) => {
  if (req.user) {
    res.json({ userDoc: req.user });
  } else {
    res.json({ userDoc: null });
  }
});

module.exports = userRoutes


