import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    console.log("y", req.body);
    const { fullName, userName, Password, ConfirmPassword, gender } = req.body;
    console.log("username", fullName, userName, Password, gender);
    if (Password !== ConfirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName: fullName,
      userName: userName,
      Password: hashedPassword,
      gender: gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      await generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, Password } = req.body;
    console.log(userName, Password);
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      Password,
      user.Password || ""
    );
    console.log("abc");
    if (!userName || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid userName or password" });
    }
    console.log("mno");
    generateTokenAndSetCookie(user._id, res);
    console.log("xyz");
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
    console.log("t");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
