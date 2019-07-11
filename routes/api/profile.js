const express = require('express');
const router = express.Router();

/* Depricated Test Route
//@route GET api/profile/test
//@desc test profile route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));
*/

//@route    GET api/profile
//@desc     Test route
//@access   Public
router.get('/', (req, res) => res.send('Profie route'));

module.exports = router;
