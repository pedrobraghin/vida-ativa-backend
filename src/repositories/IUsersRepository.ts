import { InputUserDTO, OutputUserDTO } from "../@types/UserTypes";

export interface IUsersRepository {
  getUserById(id: string): Promise<OutputUserDTO | null>;
  createUser(input: InputUserDTO): Promise<OutputUserDTO>;
  getUser(id: string, fields?: string): Promise<OutputUserDTO | null>;
  getUserByEmail(
    query: Partial<InputUserDTO>,
    fields?: string
  ): Promise<OutputUserDTO | null>;
  updateUser(
    userId: string,
    input: Partial<InputUserDTO>,
    fields?: string
  ): Promise<OutputUserDTO | null>;
  deleteUser(id: string): Promise<OutputUserDTO | null>;
  verifyEmailAvailability(email: string): Promise<boolean>;
}
