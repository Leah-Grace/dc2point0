const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const gravtar = require("gravatar");

//@route GET api/users/test
//@desc test users route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

//@route GET api/users/register
//@desc register users route
//@access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
    }
  });
});

module.exports = router;
