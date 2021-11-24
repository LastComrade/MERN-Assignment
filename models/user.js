const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = this.password.trim();
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();
    this.email = this.email.trim();
    this.phone = this.phone.trim();
    this.address = this.address.trim();

    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("User", userSchema);
