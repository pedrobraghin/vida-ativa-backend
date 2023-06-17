import { IContactsRepository } from "../../repositories/IContactsRepository";

export class GetAllContactsService {
  constructor(private contactsRepository: IContactsRepository) {}

  async execute(userId: string) {
    const contacts = await this.contactsRepository.index(userId);
    return contacts;
  }
}
