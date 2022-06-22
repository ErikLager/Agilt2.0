const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

const signToken = (userId) => {
  return jwt.sign(
    {
      iss: "coolFashion",
      sub: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

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

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      // Setting a constant holding the JWT returned from our signedToken-funcion.
      const token = signToken(_id);
      // Setting a cookie in the browser named "access-token" containing the JWT held by the constant above.
      res.cookie("access-token", token, { httpOnly: false });
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username },
        msg: { msgBody: "Right on! Successfully logged in.", msgError: false },
      });
    }
  }
);

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

userRouter.get(
  '/getuser/:id',
  (req, res) => {
    User.findById(
      req.params.id,
      (err, documents) => {
        if (err) {
          res.status(500).json({
            message: 'Oops! Error! Something went wrong while getting the user by id.', err,
          })
        } else {
          res.status(200).json(documents)
        }
      }
    )
  }
)

userRouter.get(
  '/getallusers',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({}, (err, documents) => {
      if (err) {
        res.status(500).json({
          msg: {
            msgBody: 'Oops! Error! Something went wrong while getting users.',
            msgError: true
          }
        })
      } else {
        res.status(200).json({ users: documents })
      }
    })
  }
)


userRouter.put(
  '/updateuser/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.name,
        password: req.body.password
      },
      (err) => {
        if (err) {
          res.status(500).json({
            msg: {
              msgBody: 'Oh no! An error happened while updating user data.',
              msgError: true
            }
          })
        } else {
          const { username, password } = req.body;
          const newUser = new User({ username, password });
          newUser.save((err, documents) => {
            if (err) {
              res
                .status(500)
                .json({ msg: { msgBody: "Fudge! An error occured...", msgError: true } });
            } else {
              res.status(201).json({
                msg: "Wiii!! User successfully updated",
                data: documents
              });
            }
          })
        }
      }
    )
  }
)


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
