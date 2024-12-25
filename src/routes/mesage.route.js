import express from "express"
import { updateProfile,checkAuth,login,signup,logout } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getUsersForSidebar,getMessages,sendMessages,deletemsg} from "../controllers/message.controller.js"
const router = express.Router()
router.get("/",getMessages)
router.get("/users",getUsersForSidebar)
router.post("/send",sendMessages);
router.delete("/delete/:id",deletemsg);
export default router;