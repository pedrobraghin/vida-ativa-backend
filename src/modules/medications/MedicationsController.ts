import { Request, Response, NextFunction } from "express";

import MedicationsRepository from "./MedicationsRepository";

import { EStatusCode } from "../../enums/EStatusCode";
import { AddMedicationService } from "./AddMedicationService";
import { InputMedicationDTO } from "../../@types/MedicationsTypes";
import { UpdateMedicationService } from "./UpdateMedicationService";
import { DeleteMedicationService } from "./DeleteMedicationService";
import { GetMedicationByIdService } from "./GetMedicationByIdService";
import { GetAllMedicationsService } from "./GetAllMedicationsService";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { IMedicationsRepository } from "../../repositories/IMedicationsRepository";

class MedicationsController {
  constructor(private medicationsRepository: IMedicationsRepository) {}

  @CatchExpressError
  async addMedication(req: Request, res: Response, _next: NextFunction) {
    const input: InputMedicationDTO = req.body;
    const addMedicationService = new AddMedicationService(
      this.medicationsRepository
    );
    const userId = req.app.locals.user._id.toString();
    input.userId = userId;
    const medication = await addMedicationService.execute(input);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: medication,
    });
  }

  @CatchExpressError
  async getMedication(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();

    const getMedicationByIdService = new GetMedicationByIdService(
      this.medicationsRepository
    );
    const medication = await getMedicationByIdService.execute(id, userId);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: medication,
    });
  }

  @CatchExpressError
  async getAllMedications(req: Request, res: Response, _next: NextFunction) {
    const userId = req.app.locals.user._id.toString();
    const getAllMedicationsService = new GetAllMedicationsService(
      this.medicationsRepository
    );
    const medications = await getAllMedicationsService.execute(userId);

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: medications.length,
      data: medications,
    });
  }

  @CatchExpressError
  async deleteMedication(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();

    const deleteMedicationService = new DeleteMedicationService(
      this.medicationsRepository
    );
    const deletedMedication = await deleteMedicationService.execute(id, userId);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: deletedMedication,
    });
  }

  @CatchExpressError
  async updateMedication(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();
    const input: InputMedicationDTO = req.body;

    const updateMedicationService = new UpdateMedicationService(
      this.medicationsRepository
    );

    const updatedMedication = await updateMedicationService.execute(
      id,
      userId,
      input
    );

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: updatedMedication,
    });
  }
}

export default new MedicationsController(MedicationsRepository);
