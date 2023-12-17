import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";

export const verifyToken = async (request, response, next) => {
  const token = request.cookies.access_token;  
  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    request.user = await User.findById(user.id);
    next();
  });
};
