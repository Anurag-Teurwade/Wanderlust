const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: String, 
  email: {
    type: String,
    required: true,
    unique: true,
  },

  googleId: String,
  githubId: String,
  facebookId: String,
  
  provider: String, 
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose); // adds username + hash & salt fields

module.exports = mongoose.model("User", userSchema);
