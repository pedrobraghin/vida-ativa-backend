import { InputUserDTO, OutputUserDTO } from "../../@types/UserTypes";
import { UserSchema } from "../../schemas/UserSchema";
import { IUsersRepository } from "../IUsersRepository";

export class MongoUsersRepository implements IUsersRepository {
  async getUser(
    id: string,
    fields: string = ""
  ): Promise<OutputUserDTO | null> {
    const user = await UserSchema.findOne({ _id: id }).select(fields);
    return user;
  }

  async getUserByEmail(
    query: Partial<InputUserDTO>,
    fields: string = ""
  ): Promise<OutputUserDTO | null> {
    const user = await UserSchema.findOne(query).select(fields);
    return user;
  }

  async deleteUser(id: string): Promise<OutputUserDTO | null> {
    const user = await UserSchema.findByIdAndDelete(id);
    return user;
  }

  async getUserById(id: string): Promise<OutputUserDTO | null> {
    const user = await UserSchema.findById(id);
    return user;
  }

  async createUser(input: InputUserDTO): Promise<OutputUserDTO> {
    const user = await UserSchema.create(input);
    return user;
  }

  async updateUser(
    userId: string,
    input: Partial<InputUserDTO>,
    fields: string = ""
  ): Promise<OutputUserDTO | null> {
    const user = await UserSchema.findOneAndUpdate({ _id: userId }, input, {
      new: true,
    }).select(fields);
    return user;
  }

  async verifyEmailAvailability(email: string): Promise<boolean> {
    const user = await UserSchema.findOne({ email });
    const emailAlreadyTaken = !!user;
    const emailAvailable = !emailAlreadyTaken;
    return emailAvailable;
  }
}
