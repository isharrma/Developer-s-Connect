const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route : GET api/auth
// @desc : Test route
// @access : Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// @route : POST api/validate user
// @desc : Validates credentials
// @access : Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) return res.status(400).json("Invalid Credentials");

      // Match password entered by user and the one stored in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json("Invalid Credentials");

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwt"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (err) {
      res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
