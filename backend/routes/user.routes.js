import express from "express";
import multer from "multer";
import verifyToken from "../utils/verifyToken.js";
import { getCurrentUser, updateProfile } from "../controllers/user.controller.js";
import { deleteAccount } from "../controllers/user.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/me", verifyToken, getCurrentUser);
router.put("/me", verifyToken, upload.single("profileImage"), updateProfile);
router.delete("/me", verifyToken, deleteAccount);


export default router;
