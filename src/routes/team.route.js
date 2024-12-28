import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkHost } from "../middleware/master.auth.middleware.js";
import { createTeam,UpdateTeam,deleteTeam,allteam ,teamParticipants,submitPpt} from "../controllers/team.controller.js";

const router = express.Router();
router.get("/allteam",protectRoute,allteam)
router.post("/createteam",checkHost,createTeam);
router.get("/teamParticipant/:name",protectRoute,teamParticipants)
router.post("/updateteam/:id",checkHost,UpdateTeam);
router.delete("/deleteteam/:id",checkHost,deleteTeam)
router.post("/pptsubmission/:id",protectRoute,submitPpt)

export default router;