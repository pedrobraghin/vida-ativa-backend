import { Request, Response, NextFunction } from "express";

import RemindersRepository from "./RemindersRepository";

import { EStatusCode } from "../../enums/EStatusCode";
import { InputReminderDTO } from "../../@types/ReminderTypes";
import { CreateReminderService } from "./CreateReminderService";
import { DeleteReminderService } from "./DeleteReminderService";
import { UpdateReminderService } from "./UpdateReminderService";
import { GetReminderByIdService } from "./GetReminderByIdService";
import { GetAllRemindersService } from "./GetAllRemindersService";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { IRemindersRepository } from "../../repositories/IRemindersRepository";

class RemindersController {
  constructor(private remindersRepository: IRemindersRepository) {}

  @CatchExpressError
  async createReminder(req: Request, res: Response, _next: NextFunction) {
    const input: InputReminderDTO = req.body;
    const createReminderService = new CreateReminderService(
      this.remindersRepository
    );
    const userId = req.app.locals.user._id.toString();
    input.userId = userId;
    const reminder = await createReminderService.execute(input);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: reminder,
    });
  }

  @CatchExpressError
  async getReminder(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();

    const getReminderByIdService = new GetReminderByIdService(
      this.remindersRepository
    );
    const reminder = await getReminderByIdService.execute(id, userId);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: reminder,
    });
  }

  @CatchExpressError
  async getAllReminders(req: Request, res: Response, _next: NextFunction) {
    const userId = req.app.locals.user._id.toString();
    const getAllRemindersService = new GetAllRemindersService(
      this.remindersRepository
    );
    const query: Partial<InputReminderDTO> = req.query;

    const reminders = await getAllRemindersService.execute(query, userId);

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: reminders.length,
      data: reminders,
    });
  }

  @CatchExpressError
  async deleteReminder(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();

    const deleteReminderService = new DeleteReminderService(
      this.remindersRepository
    );
    const deletedReminder = await deleteReminderService.execute(id, userId);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: deletedReminder,
    });
  }

  @CatchExpressError
  async updateReminder(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userId = req.app.locals.user._id.toString();

    const input: Partial<InputReminderDTO> = req.body;
    const updateReminderService = new UpdateReminderService(
      this.remindersRepository
    );
    const updatedReminder = await updateReminderService.execute(
      id,
      input,
      userId
    );

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: updatedReminder,
    });
  }
}

export default new RemindersController(RemindersRepository);
