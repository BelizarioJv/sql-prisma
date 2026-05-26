import { Router } from "express";
import { customerController } from "../controllers/customerController.js";

export const router = Router();

router.get("/customer", customerController.index);
router.get("/customer/:id", customerController.show);
router.post("/customer", customerController.save);
router.put("/customer/:id", customerController.update);
router.delete("/customer/:id", customerController.delete);

router.get("/order", orderController.index);
router.post("/order", orderController.save);
router.put("/order/:id", orderController.update);
router.delete("/order/:id", orderController.delete);
