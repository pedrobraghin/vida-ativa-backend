import bcrypt from "bcrypt";

export class PasswordUtils {
  public async hashPass(password: string): Promise<string> {
    const SALT = Number(process.env.BCRYPT_SALT);
    const hashedPass = await bcrypt.hash(password, SALT);
    return hashedPass;
  }

  public async comparePass(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}
