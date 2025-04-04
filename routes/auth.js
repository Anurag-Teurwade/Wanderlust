const express = require("express");
const passport = require("../config/passport");
const router = express.Router();

// ========== GOOGLE AUTH ==========
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// // ========== FACEBOOK AUTH ==========
// router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// router.get("/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

// ========== GITHUB AUTH ==========
router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// // ========== TWITTER AUTH ==========
// router.get("/auth/twitter", passport.authenticate("twitter"));

// router.get("/auth/twitter/callback",
//   passport.authenticate("twitter", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

// // ========== APPLE AUTH ==========
// router.get("/auth/apple", passport.authenticate("apple"));

// router.get("/auth/apple/callback",
//   passport.authenticate("apple", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

module.exports = router;
