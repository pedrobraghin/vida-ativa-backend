import { MongoUtils } from "../../utils/MongoUtils";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { IContactsRepository } from "../../repositories/IContactsRepository";
import { IMedicationsRepository } from "../../repositories/IMedicationsRepository";
import { IAppointmentsRepository } from "../../repositories/IAppointmentsRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class GetElderlyInfosService {
  constructor(
    private friendsRepository: IFriendsRepository,
    private contactsRepository: IContactsRepository,
    private appointmentsRepository: IAppointmentsRepository,
    private events: IEventsRepository,
    private medicationsRepository: IMedicationsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(elderlyId: string, userId: string) {
    const isValidElderlyId = MongoUtils.isValidId(elderlyId);

    if (!isValidElderlyId) {
      throw new InvalidParameterError("Invalid user ID!");
    }

    const isFriends = await this.friendsRepository.verifyFriendship(
      elderlyId,
      userId
    );

    if (!isFriends) {
      throw new UnauthorizedError(
        "You are not allowed to perform this action."
      );
    }

    const [contacts, appointments, { events }, medications, elderly] =
      await Promise.all([
        this.contactsRepository.index(elderlyId),
        this.appointmentsRepository.index(elderlyId),
        this.events.index({ userId: elderlyId }),
        this.medicationsRepository.index(elderlyId),
        this.usersRepository.getUser(
          elderlyId,
          "img phoneNumber fullName address"
        ),
      ]);

    return {
      contacts,
      appointments,
      events,
      medications,
      elderly,
    };
  }
}
