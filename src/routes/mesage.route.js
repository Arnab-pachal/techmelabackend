import express from "express"
import { updateProfile,checkAuth,login,signup,logout } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getUsersForSidebar,getMessages,sendMessages,deletemsg} from "../controllers/message.controller.js"
const router = express.Router()
router.get("/",protectRoute,getMessages)
router.get("/users",protectRoute,getUsersForSidebar)
router.post("/send",protectRoute,sendMessages);
router.delete("/delete/:id",protectRoute,deletemsg);
export default router;