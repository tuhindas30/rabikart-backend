const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: "Cannot have a user without a username",
      maxLength: 50,
      unique: true,
    },
    email: {
      type: String,
      required: "Cannot enter a user without email",
      index: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: "Cannot have a user without a password",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods = {
  setHashedPassword: async function () {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      console.log(err);
    }
  },
  checkPassword: async function (plainTextPassword) {
    try {
      return await bcrypt.compare(plainTextPassword, this.password);
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

const User = model("User", UserSchema);

module.exports = { User };
