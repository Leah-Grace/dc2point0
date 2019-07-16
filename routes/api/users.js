const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/users
//@desc     Register user
//@access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a passwordwith 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // console.log(req.body); //objec of data, required body-parser
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      //see if user exists already >> send error
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] });
      }

      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });
      //encrypt with bcrypt
      const salt = await bcrypt.genSalt(10);

      user.passowrd = await bcrypt.hash(password, salt);

      await user.save();
      //return jsonwebtoken, start with creating payload
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 }, //change before deployment to 3600
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server error`);
    }
  }
);

module.exports = router;
