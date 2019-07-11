const express = require('express');
const router = express.Router();

/* Depricated test route
//@route GET api/posts/test
//@desc test posts route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));
*/

router.get('/', (req, res) => {
  res.send(`posts route`);
});

module.exports = router;
