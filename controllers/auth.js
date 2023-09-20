const {
  generateSaltAndHashedPassword,
  isMatchingPassword,
} = require("../utils/auth");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

exports.sign_up_get = (req, res, next) => {
  res.render("sign-up-form");
};

// TODO: these validation calls can be DRYed up if used across routes?

exports.sign_up_post = [
  body("first_name", "Please enter a valid first name.")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("last_name", "Please enter a valid last name.")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("username", "Please enter a valid username.")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("password", "Please enter a valid password.")
    .isLength({ min: 6 })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("sign-up-form", {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        errors: errors.array(),
      });
      return;
    }

    const isUsernameTaken = await User.findOne({
      username: req.body.username,
    }).exec();

    if (isUsernameTaken) {
      res.render("sign-up-form", {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        errors: [
          { msg: "That username is already taken.  Please choose another." },
        ],
      });
      return;
    }

    const { salt, hashedPassword } = generateSaltAndHashedPassword(
      req.body.password
    );

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      hashed_password: hashedPassword,
      salt: salt,
    });

    await user.save();
    res.redirect("/"); // TODO: where to redirect to?
  },
];
