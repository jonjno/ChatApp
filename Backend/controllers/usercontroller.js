import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-Password"
    );
    // All user expectloggedin User
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
