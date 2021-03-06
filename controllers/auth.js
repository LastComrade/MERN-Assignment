const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authCont = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, phone, address, password } = req.body;
      await User.findOne({ email }, async (err, user) => {
        if (err) {
          return res.status(500).json({
            message: "Something went wrong. Please try again later",
          });
        } else if (user) {
          return res.status(403).json({
            message: "User with this email address already exists",
          });
        } else if (!user) {
          const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            address,
            password,
          });
          await newUser.save();
          return res.status(200).json({ message: "User created successfully" });
        }
      })
        .clone()
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      return res
        .status(500)
        .send("Something went wrong. Please try again later");
      console.log(err);
    }
  },

  login: async (req, res) => {
    try {
      const email = req.body.email.trim();
      const { password } = req.body;
      await User.findOne({ email }, async (err, user) => {
        if (err) {
          return res.status(500).json({
            message: "Something went wrong. Please try again later",
          });
        } else if (!user) {
          return res.status(403).json({ message: "User not found" });
        } else if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return res.status(500).json({ message: "Something went wrong" });
            } else if (result) {
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              user.password = undefined;
              return res.status(200).json({
                message: "Login successful",
                token,
                user,
              });
            } else if (!result) {
              return res.status(403).json({ message: "Incorrect password" });
            }
          });
        }
      })
        .clone()
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      return res
        .status(500)
        .send("Something went wrong. Please try again later");
      console.log(err);
    }
  },
  getUser: async (req, res) => {
    try {
      await User.findById(
        req.userId,
        "firstName lastName email phone address",
        (err, user) => {
          if (err) {
            return res.status(500).json({
              message: "Something went wrong. Please try again later",
            });
          } else if (!user) {
            return res.status(403).json({ message: "User not found" });
          } else if (user) {
            return res.status(200).json({
              message: "User found",
              user,
            });
          }
        }
      )
        .clone()
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      return res
        .status(500)
        .send("Something went wrong. Please try again later");
      console.log(err);
    }
  },
};

module.exports = authCont;
