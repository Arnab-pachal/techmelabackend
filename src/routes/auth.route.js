import express from "express"
import { updateProfile,checkAuth,login,signup,logout,updateName } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
const router = express.Router()
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-profile",updateProfile);
router.put("/updateName",updateName)
router.get("/check",checkAuth)
export default router;