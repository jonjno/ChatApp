import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // prevernt xss attacks ,cross-site scripiting attck
    sameSite: "strict",
    // CSRF attack cross-site request forgery attcks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
