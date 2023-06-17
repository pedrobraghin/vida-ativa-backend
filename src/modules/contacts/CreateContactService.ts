import { InputContactDTO } from "../../@types/ContactTypes";
import { IContactsRepository } from "../../repositories/IContactsRepository";

export class CreateContactService {
  constructor(private contactsRepository: IContactsRepository) {}

  async execute(input: InputContactDTO) {
    const contact = await this.contactsRepository.createContact(input);
    return contact;
  }
}
