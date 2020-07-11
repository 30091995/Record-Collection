const express = require('express');
const userRoutes = express.Router();

//for the email verification 

const nodemailer = require('nodemailer')

//Put passport variables here

const passport = require('passport');
const bcrypt = require('bcryptjs');

//require the user model!!!!


const User = require('../models/user-model.js')


// SMTP 
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'hackgeorges6@gmail.com',
    pass: 'iron_georges123',
  }
});

// POST /api/signup (This route sign up a user in the database)

userRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username
  const fullname = req.body.fullname
  const email = req.body.email;
  const password = req.body.password;

  // creates a 4 digit random token
  const tokenArr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10))
  const token = tokenArr.join(''); // 6 digits

  User.findOne({ username })
  .then((u) => {
    if (u !== null)
    {
      res.status(400).json({
        message : "Username already exists"
      })
      throw new Error('Username already exists')

    }
    return User.findOne({ email })
  })
  .then((u) => {

    if (u !== null)
    {
      res.status(400).json({
        message : "Email already exists"
      }) // email already exists
      throw new Error('Email already exists')
    }
    return transporter.sendMail({
      from: '"Recordbox" <myawesome@project.com>',
      to: email,
      subject: 'Email verification token',
      text: `Hey, thanks for joining recordbox! Click the link to confirm your mail adress: ${process.env.EMAIL_LINK}/${token}`,
      html: `Hey, thanks for joining recordbox! Click the link to confirm your mail adress: ${process.env.EMAIL_LINK}/${token}`
  
    })
  })
  .then(() => {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      email: email,
      password: hashPass,
      username: username,
      fullname: fullname,
      token : token
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
  })
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

userRoutes.get('/verify-email-link/:token',(req, res, next) => {
  if (req.user.token === req.params.token) {
    req.user.verifiedEmail = true
    req.user.save().then(() => {
      // res.redirect to React App
      res.redirect(`${process.env.FRONT_END}/profile`)
    })
  }
})


// Route for google
userRoutes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

userRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONT_END}/profile`,
    failureRedirect: "/" // here you would redirect to the login page using traditional login approach
  })
);

module.exports = userRoutes


