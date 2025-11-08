import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify JWT token
export const authenticate = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Handle admin token
    if (decoded.userId === "admin") {
      req.user = {
        userId: "admin",
        role: "admin",
        username: process.env.ADMIN_USERNAME,
      };
      return next();
    }

    // Get user from token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated.",
      });
    }

    req.user = {
      userId: user._id,
      role: user.role,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
      error: error.message,
    });
  }
};

// Middleware to check if user is admin
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
};

// Optional authentication (user can be logged in or not)
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userId === "admin") {
          req.user = {
            userId: "admin",
            role: "admin",
            username: process.env.ADMIN_USERNAME,
          };
        } else {
          const user = await User.findById(decoded.userId).select("-password");
          if (user && user.isActive) {
            req.user = {
              userId: user._id,
              role: user.role,
              username: user.username,
              email: user.email,
            };
          }
        }
      } catch (error) {
        // Token is invalid, but that's okay for optional auth
        req.user = null;
      }
    }

    next();
  } catch (error) {
    next();
  }
};
