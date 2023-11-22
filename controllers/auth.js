const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup route handler
exports.signup = async (req, res) => {
  try {
    // get data
    const { name, email, password, role } = req.body;

    // if user already exist
    const existUser = await User.findOne({ email });

    // Valid Entry
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User Already exist",
      });
    }

    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in Hasing Data",
      });
    }

    // create entry for User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User created Successfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;
    //validate on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill al the details carefully",
      });
    }
    // check for registered user
    let user = await User.findOne({ email });
    // if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    //verify password & generate a JWT token
    if (await bcrypt.compare(password, user.password)) {
      // password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      // insert token in user object
      user.token = token;
      // remove password from user object for AuthN
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Logged in successfully",
      });
    } else {
      // password donot match
      return res.status(402).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
