const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

// @route   : GET api/users
// @desc   :  Register User route
// @access :  Public
router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should be minimum of 6 letters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, email, password } = req.body; // Destructuring the body

    try {
      let user = await User.findOne({ email });

      if (user) return res.status(400).json("User already exists");

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Creating an instance of user

      user = new User({
        username,
        email,
        avatar,
        password,
      });

      // Encrypting the password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save(); // Finally saves the user

      // Using Jsonwebtoken to authorize user login

      const payload = {
        user: {
          id: user.id,
        },
      }; // Here we have destructured user by '{}' brackets.

      jwt.sign(
        payload,
        config.get("jwt"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
