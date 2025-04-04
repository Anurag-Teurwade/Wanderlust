const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
// const TwitterStrategy = require("passport-twitter").Strategy;
// const AppleStrategy = require("passport-apple").Strategy;
const mongoose = require("mongoose");
const User = require("../models/user");



// Serialize & Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return done(null, false);
    }
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// ========== GOOGLE AUTH ==========
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          username: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
        });
      }
      return done(null, user);
    }
  )
);

// // ========== FACEBOOK AUTH ==========
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: "/auth/facebook/callback",
//       profileFields: ["id", "displayName", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       let user = await User.findOne({ facebookId: profile.id });
//       if (!user) {
//         user = await User.create({
//           username: profile.displayName,
//           facebookId: profile.id,
//           email: profile.emails ? profile.emails[0].value : "No Email",
//         });
//       }
//       return done(null, user);
//     }
//   )
// );

// ========== GITHUB AUTH ==========
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = await User.create({
          username: profile.username,
          githubId: profile.id,
        });
      }
      return done(null, user);
    }
  )
);

// // ========== TWITTER AUTH ==========
// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: process.env.TWITTER_CLIENT_ID,
//       consumerSecret: process.env.TWITTER_CLIENT_SECRET,
//       callbackURL: "/auth/twitter/callback",
//       includeEmail: true,
//     },
//     async (token, tokenSecret, profile, done) => {
//       let user = await User.findOne({ twitterId: profile.id });
//       if (!user) {
//         user = await User.create({
//           username: profile.displayName,
//           twitterId: profile.id,
//           email: profile.emails ? profile.emails[0].value : "No Email",
//         });
//       }
//       return done(null, user);
//     }
//   )
// );

// // ========== APPLE AUTH ==========
// passport.use(
//   new AppleStrategy(
//     {
//       clientID: process.env.APPLE_CLIENT_ID,
//       teamID: process.env.APPLE_TEAM_ID,
//       keyID: process.env.APPLE_KEY_ID,
//       privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
//       callbackURL: "/auth/apple/callback",
//     },
//     async (accessToken, refreshToken, idToken, profile, done) => {
//       let user = await User.findOne({ appleId: profile.id });
//       if (!user) {
//         user = await User.create({
//           username: profile.displayName || "Apple User",
//           appleId: profile.id,
//           email: profile.email || "No Email",
//         });
//       }
//       return done(null, user);
//     }
//   )
// );

module.exports = passport;
