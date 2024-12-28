import express from "express"
import { updateProfile,checkAuth,login,signup,logout,updateName,allUser } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import { checkHost } from "../middleware/master.auth.middleware.js"
 const router = express.Router()
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-profile",protectRoute,updateProfile);
router.put("/updateName",protectRoute,updateName)
router.get("/check",protectRoute,checkAuth)
router.put("/update-profile",protectRoute,updateProfile);
router.put("/updateName",protectRoute,updateName)
router.get("/check",protectRoute,checkAuth)
router.get("/allUser",checkHost,allUser)
export default router;