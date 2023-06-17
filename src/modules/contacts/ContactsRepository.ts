import { IContactsRepository } from "../../repositories/IContactsRepository";
import { MongoContactsRepository } from "../../repositories/implementations/MongoContactsRepository";

const ContactsRepository: IContactsRepository = new MongoContactsRepository();

export default ContactsRepository;
