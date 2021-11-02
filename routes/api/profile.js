const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const request = require("request");

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route : GET api/profile/me
// @desc : Get current user  profile
// @access : Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["id", "avatar"]
    );

    if (!profile) return res.status(400).json("Invalid Profile");

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// @route : POST api/profile/me
// @desc : Get current user  profile
// @access : Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array(),
      });

    const {
      website,
      skills,
      youtube,
      instagram,
      linkedin,
      company,
      status,
      bio,
      githubusername,
      location,
    } = req.body;

    // Setting up profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    profileFields.skills = {};
    if (skills) {
      profileFields.skills = skills
        .toString()
        .split(",")
        .map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (youtube) profileFields.social.youtube = youtube;

    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      await profile.save(); // All mongoose function return promises.
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server Error");
    }
  }
);

// @route : GET api/profile
// @desc : Get all the profiles
// @access : Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "username",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.log(err);
    rs.status(500).json("Server Error");
  }
});

// @route : GET api/profile/user/:user_id
// @desc : Get a profile by id
// @access : Public
router.get("/user/:user_id", async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id }).populate(
      "user",
      ["username", "avatar"]
    );

    if (!profile) return res.status(400).json("Profile doesnt exist");

    res.json(profile);
  } catch (err) {
    console.log(err);

    if (err.kind == "ObjectId")
      return res.status(400).json("Profile doesnt exist");

    res.status(500).json("Server Error");
  }
});

// @route : DELETE api/profile
// @desc : Delete a profile,user & posts
// @access : Private
router.delete("/", auth, async (req, res) => {
  try {
    //Deleting all the posts by user
    await Post.deleteMany({ user: req.user.id });

    //Delete Profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Delete User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json("User Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// @route : PUT api/profile/experience
// @desc : Update/Add experiece
// @access : Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Tile can  not be empty").not().isEmpty(),
      check("company", "Company can not be empty").not().isEmpty(),
      check("from", "From field can not be empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, company, location, from, to, current, desc } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      desc,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  }
);

// @route : DELETE api/profile/experience
// @desc : Delete a user's experience
// @access : Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const idx = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(idx, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// @route : PUT api/profile/education
// @desc : Update/Add education
// @access : Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School can not be empty").not().isEmpty(),
      check("degree", "Degree can not be empty").not().isEmpty(),
      check("from", "From date can not be empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { school, degree, fieldofstudy, from, to, current, desc } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      desc,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  }
);

// @route : DELETE api/profile/education/:edu_id
// @desc : Delete a user's experience
// @access : Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const idx = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(idx, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// @route : GET api/profile/github/:username
// @desc : Get user's github repos
// @access : Public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&
     client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js", Accept: "application/json" },
    };

    // client_id=${config.get("githubClientId")}&client_secret=${config.get(
    //   "githubClientSecret"
    request(options, (error, response, body) => {
      if (error) console.log(error);

      if (response.statusCode !== 200) {
        return res.status(404).json([]);
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
