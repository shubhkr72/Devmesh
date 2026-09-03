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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email address!");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isValidPassword = await user.comparePasswords(password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials!");
    }

    const token = await user.getJWT();

    if (!token) {
      throw new Error("Token not found!");
    }

    const safeUserData = USER_SAFE_DATA.reduce((acc, key) => {
      acc[key] = user[key];
      return acc;
    }, {});

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successful!",
        user: safeUserData,
      });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(400)
      .send(error?.message || "ERROR: Something went wrong!");
  }
};

export const registerController = async (req, res) => {
  try {
    validateRegisterData(req.body);

    const { name, username, password, email } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res
        .status(401)
        .send("Account already exists, please login!");
    }

    const hash = await bcrypt.hash(password, 10);

    if (!hash) {
      throw new Error("Error in password encryption!");
    }

    const user = new User({
      name,
      username,
      email,
      password: hash,
    });

    await user.save();

    const token = await user.getJWT();

    if (!token) {
      throw new Error("Token not found!");
    }

    const safeUserData = USER_SAFE_DATA.reduce((acc, key) => {
      acc[key] = user[key];
      return acc;
    }, {});

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        message: "Registration successful!",
        data: safeUserData,
      });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(400)
      .send(error?.message || "ERROR: Something went wrong!");
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