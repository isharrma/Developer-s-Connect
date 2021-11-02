const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route : POST api/posts
// @desc : Create a post
// @access : Private
router.post(
  "/",
  [auth, [check("text", "Text can not be empty").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(400).json("Server Error");
    }
  }
);

// @route : GET api/posts/
// @desc : Get all post
// @access : Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

// @route : GET api/posts/:id
// @desc : Get a post by id
// @access : Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json("Post not found");
    res.json(post);
  } catch (error) {
    console.log(error);

    if (error.kind === "ObjectId")
      return res.status(404).json("Post not found");

    res.status(500).json("Server Error");
  }
});

// @route : DELETE api/posts/:post_id
// @desc : Delete a post
// @access : Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id)
      return res.status(401).json("User not Authorized");

    if (!post) return res.status(404).json("Post not found");

    await post.remove();

    res.json("Post removed");
  } catch (error) {
    console.log(error);

    if (error.kind === "ObjectId")
      return res.status(404).json("Post not found");

    res.status(500).json("Server Error");
  }
});

// @route : PUT api/posts/like/:id
// @desc : Like a post
// @access : Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(400).json("Post Already Liked");

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

// @route : PUT api/posts/unlike/:id
// @desc : Unlike a post
// @access : Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length == 0
    )
      return res.status(400).json("Post has not been liked yet");

    const idx = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(idx, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

// @route : PUT api/posts/comment/:id
// @desc : Comment on a post
// @access : Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Comment can not be empty").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.log(err);

      if (err.kind === "ObjectId")
        return res.status(404).json("Post Not Found");

      res.status(500).json("Server Error");
    }
  }
);

// @route : DELETE api/posts/comment/:id/:comment_id
// @desc : Delete on a post
// @access : Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull Out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Check if comment exists
    if (!comment) return res.status(400).json("You have not commneted yet");

    // Check if user has authorization
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json("User not authored");

    const idx = post.comments
      .map((comment) => comment.user.id.toString())
      .indexOf(req.user.id);

    post.comments.splice(idx, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.log(err);
    res.json.status(500).json("Server Error");
  }
});

module.exports = router;
