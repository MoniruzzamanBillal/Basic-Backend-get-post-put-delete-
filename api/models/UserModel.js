const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Enter your name"],
  },
  age: {
    type: Number,
    require: [true, "Enter your age"],
  },
  username: {
    type: String,
    require: [true, "Enter your user name"],
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
