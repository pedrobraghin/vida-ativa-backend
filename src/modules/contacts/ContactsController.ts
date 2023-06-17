import { GetAllContactsService } from "./GetAllContactsService";
import { UpdateContactService } from "./UpdateContactService";
import { DeleteContactService } from "./DeleteContactService";
import { GetContactByIdService } from "./GetContactByIdService";
import { Request, Response, NextFunction } from "express";

import ContactsRepository from "./ContactsRepository";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { IContactsRepository } from "../../repositories/IContactsRepository";
import { EStatusCode } from "../../enums/EStatusCode";
import { InputContactDTO } from "../../@types/ContactTypes";
import { CreateContactService } from "./CreateContactService";

class ContactsController {
  constructor(private contactsRepository: IContactsRepository) {}

  @CatchExpressError
  async createContact(req: Request, res: Response, _next: NextFunction) {
    const input: InputContactDTO = req.body;
    const createContactService = new CreateContactService(
      this.contactsRepository
    );
    const userId = req.app.locals.user._id.toString();
    input.userId = userId;

    const contact = await createContactService.execute(input);
    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: contact,
    });
  }

  @CatchExpressError
  async getContact(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userID = req.app.locals.user._id.toString();
    const getContactByIdService = new GetContactByIdService(
      this.contactsRepository
    );
    const contact = await getContactByIdService.execute(id, userID);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: contact,
    });
  }

  @CatchExpressError
  async getAllContacts(req: Request, res: Response, _next: NextFunction) {
    const userID = req.app.locals.user._id.toString();
    const getAllContactsService = new GetAllContactsService(
      this.contactsRepository
    );
    const contacts = await getAllContactsService.execute(userID);

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: contacts.length,
      data: contacts,
    });
  }

  @CatchExpressError
  async deleteContact(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userID = req.app.locals.user._id.toString();

    const deleteContactService = new DeleteContactService(
      this.contactsRepository
    );
    const contact = await deleteContactService.execute(id, userID);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: contact,
    });
  }

  @CatchExpressError
  async updateContact(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const input: InputContactDTO = req.body;
    const userID = req.app.locals.user._id.toString();

    const updateContactService = new UpdateContactService(
      this.contactsRepository
    );

    const contact = await updateContactService.execute(id, userID, input);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: contact,
    });
  }
}

export default new ContactsController(ContactsRepository);
