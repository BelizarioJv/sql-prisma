import { Router } from "express";
import { LeadsController } from "../controllers/leadController";
import { GroupsController } from "../controllers/groupController";
import { CampaignsController } from "../controllers/campaignsController";

const leadsController = new LeadsController();
const groupsController = new GroupsController();
const campaignsController = new CampaignsController();

export const router = Router();
//rotas de leads
router.get("/leads", leadsController.index);
router.post("/leads", leadsController.create);
router.get("/leads/:id", leadsController.show);
router.delete("/leads/:id", leadsController.delete);
router.put("/leads/:id", leadsController.update);

//rotas de grupos
router.get("/groups", groupsController.index);
router.post("/groups", groupsController.create);
router.get("/groups/:id", groupsController.show);
router.put("/groups/:id", groupsController.update);
router.delete("/groups/:id", groupsController.delete);

//rotas de campanhas
router.get("/groups", campaignsController.index);
router.post("/groups", campaignsController.create);
router.get("/groups/:id", campaignsController.show);
router.put("/groups/:id", campaignsController.update);
router.delete("/groups/:id", campaignsController.delete);
