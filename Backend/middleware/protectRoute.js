import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorised No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded) {
      return res.status(401).json({ error: "unauthorised -Invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-Password");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    req.user = user;
    console.log(req.user._id);
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
