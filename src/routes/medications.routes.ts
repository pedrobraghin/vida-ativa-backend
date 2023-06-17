import { Router } from "express";
import { auth } from "../middlewares/auth";

import MedicationsController from "../modules/medications/MedicationsController";

const medicationsRouter = Router();

medicationsRouter.use(auth);
medicationsRouter.post("/", MedicationsController.addMedication);
medicationsRouter.get("/", MedicationsController.getAllMedications);
medicationsRouter.get("/:id", MedicationsController.getMedication);
medicationsRouter.delete("/:id", MedicationsController.deleteMedication);
medicationsRouter.patch("/:id", MedicationsController.updateMedication);

export { medicationsRouter };
