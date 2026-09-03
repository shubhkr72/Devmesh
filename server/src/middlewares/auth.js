import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    let user = null;

    if (token) {
      try {
        const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedData;
        if (_id) {
          user = await User.findById(_id);
        }
      } catch (err) {
        // Token invalid, continue to check for userId
      }
    }

    if (!user) {
      const userId = req.query.userId || req.body.userId;
      if (userId) {
        user = await User.findById(userId);
      }
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error: ", error.message);
    next(); // Continue anyway to make it public
  }
};

export default checkAuth;
