import { validateRegisterData } from "../utils/validation.js";
import validator from "validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { USER_SAFE_DATA } from "../constants.js";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

import validator from "validator";
import User from "../models/user.js";
import { USER_SAFE_DATA} from "../constants.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address!",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }

    const isValidPassword = await user.comparePasswords(password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }

    const token = user.getJWT();

    const safeUserData = USER_SAFE_DATA.reduce((acc, key) => {
      acc[key] = user[key];
      return acc;
    }, {});

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successful!",
        user: safeUserData,
      });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
};

export const registerController = async (req, res) => {
  try {
    validateRegisterData(req.body);

    const { name, username, password, email } = req.body;

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    const foundUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { username: normalizedUsername },
      ],
    });

    if (foundUser) {
      return res.status(409).json({
        message: "Account already exists, please login!",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      username: normalizedUsername,
      email: normalizedEmail,
      password: hash,
    });

    await user.save();

    const token = user.getJWT();

    const safeUserData = USER_SAFE_DATA.reduce((acc, key) => {
      acc[key] = user[key];
      return acc;
    }, {});

    return res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        message: "Registration successful!",
        data: safeUserData,
      });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
};

export const logoutController = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      expires: new Date(0),
    })
    .json({
      message: "Logged out successfully!",
    });
};