import bcrypt from "bcrypt";
import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "lastfm_username", "profile_image"]
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const userData = user.toJSON();

    if (userData.profile_image) {
      userData.profile_image = `${process.env.BASE_URL}${userData.profile_image}`;
    }

    res.json(userData);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email, lastfm_username, oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (lastfm_username) user.lastfm_username = lastfm_username;

    if (req.file) {
      user.profile_image = `/uploads/${req.file.filename}`;
    }

    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({ error: "Current password is required to set a new password." });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect." });
      }
      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
    }

    await user.save();
    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Username or email already exists." });
    }
    res.status(500).json({ error: "Server error." });
  }
};


export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};
