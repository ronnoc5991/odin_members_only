const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", async (req, res, next) => {
  res.render("index", {
    title: "Members Only",
  });
});

router.get("/sign-up", authController.sign_up_get);

router.post("/sign-up", authController.sign_up_post);

module.exports = router;
