const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

// Function that creates our JSON Web Token (cookie).
const signToken = (userId) => {
  return jwt.sign(
    {
      iss: "ChristianDR",
      sub: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

// Save new user to db.
userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ msg: { msgBody: "Sad! An error occured...", msgError: true } });
    }
    if (user) {
      res
        .status(400)
        .json({ msg: { msgBody: "Goddamnit! Username is already taken.", msgError: true } });
    } else {
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ msg: { msgBody: "Fudge! An error occured...", msgError: true } });
        } else {
          res.status(201).json({
            msg: { msgBody: "Wiii!! Account successfully created", msgError: false },
          });
        }
      });
    }
  });
});

// Runs local strategy middleware (passport.js file) and sets cookie to JWT created through our signToken() function.
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      // Setting a constant holding the JWT returned from our signedToken-funcion.
      const token = signToken(_id);
      // Setting a cookie in the browser named "access-token" containing the JWT held by the constant above.
      res.cookie("access-token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username },
        msg: { msgBody: "Right on! Successfully logged in.", msgError: false },
      });
    }
  }
);

// Runs JWT strategy middleware (passport.js file) to see if there is a session cookie (JWT) stored in our browser.
userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, username } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: { _id, username },
    });
  }
);

// Runs JWT strategy middleware (passport.js file) to see if there is a session cookie (JWT) stored in our browser, then clears cookie so user is no longer authenticated.
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access-token");
    res
      .status(200)
      .json({ msg: { msgBody: "You have successfully logged out, my good sir!", msgError: false } });
  }
);

module.exports = userRouter;
