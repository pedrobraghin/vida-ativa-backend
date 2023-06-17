import { IFriendsRepository } from "../../repositories/IFriendsRepository";
import { MongoFriendsRepository } from "../../repositories/implementations/MongoFriendsRepository";

const FriendsRepository: IFriendsRepository = new MongoFriendsRepository();

export default FriendsRepository;
