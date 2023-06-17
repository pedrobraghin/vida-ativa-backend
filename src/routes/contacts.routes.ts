import ContactsController from "../modules/contacts/ContactsController";

import { Router } from "express";
import { auth } from "../middlewares/auth";

const contactRouter = Router();

contactRouter.use(auth);
contactRouter.post("/", ContactsController.createContact);
contactRouter.get("/", ContactsController.getAllContacts);
contactRouter.get("/:id", ContactsController.getContact);
contactRouter.delete("/:id", ContactsController.deleteContact);
contactRouter.patch("/:id", ContactsController.updateContact);

export { contactRouter };
