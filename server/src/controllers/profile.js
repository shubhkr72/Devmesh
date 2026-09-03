import {
  validateChangePasswordData,
  validateProfileEditData,
} from "../utils/validation.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { USER_SAFE_DATA } from "../constants.js";

const toSafeUser = (user) =>
  USER_SAFE_DATA.reduce((acc, key) => {
    acc[key] = user[key];
    return acc;
  }, {});

export const getPlatformStatsController = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error?.message });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const user = req?.user;

    if (!user) throw new Error("User not found!");

    res
      .status(200)
      .json({ message: "User fetched successfully!", user: toSafeUser(user) });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error?.message });
  }
};

export const editProfileController = async (req, res) => {
  try {
    if (req.body.skills) {
      try {
        req.body.skills = JSON.parse(req.body.skills);
      } catch (error) {
        return res.status(400).json({ message: "Invalid skills format" });
      }
    }

    validateProfileEditData(req.body);

    const user = req?.user;

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    Object.keys(req.body).forEach((key) => {
      if (
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        req.body[key] !== ""
      ) {
        user[key] = req.body[key];
      }
    });

    await user.save();

    res.json({
      message: "Profile updated successfully!",
      data: toSafeUser(user),
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(400).json({ message: "ERROR: " + error?.message });
  }
};

export const changePasswordController = async (req, res) => {
  try {
    await validateChangePasswordData(req);

    const user = req?.user;

    if (!user) throw new Error("User not found!");

    const hash = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hash;

    await user.save();

    res.json({ message: "Password changed successfully!" });
  } catch (error) {
    return res.status(400).send("ERROR: " + error?.message);
  }
};
