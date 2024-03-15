const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat({token});
  await this.save();
  return token;
}

const User = mongoose.model("user", UserSchema);
module.exports = User;
