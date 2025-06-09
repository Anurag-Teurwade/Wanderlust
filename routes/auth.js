
const express = require("express");
const passport = require("passport");
const router = express.Router();

// -------------------- Google OAuth --------------------
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/signup",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back, Google user!");
    res.redirect("/listings");
  }
);

// -------------------- GitHub OAuth --------------------
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/signup",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back, GitHub user!");
    res.redirect("/listings");
  }
);

// -------------------- Facebook OAuth --------------------
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/signup",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back, Facebook user!");
    res.redirect("/listings");
  }
);

// -------------------- Logout --------------------
router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully!");
    res.redirect("/login");
  });
});

module.exports = router;
