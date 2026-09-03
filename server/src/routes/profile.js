import express from "express";
import checkAuth from "../middlewares/auth.js";
import {
  editProfileController,
  getPlatformStatsController,
  getProfileController,
  changePasswordController,
} from "../controllers/profile.js";

const profileRouter = express.Router();

profileRouter.get("/platform/stats", getPlatformStatsController);

profileRouter.get("/profile", checkAuth, getProfileController);

profileRouter.patch("/profile/edit", checkAuth, editProfileController);

profileRouter.patch(
  "/profile/changePassword",
  checkAuth,
  changePasswordController
);

export default profileRouter;
