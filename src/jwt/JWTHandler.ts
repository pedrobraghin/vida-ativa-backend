import jwt, { JwtPayload } from "jsonwebtoken";

interface Payload extends JwtPayload {
  id: string;
}

export class JWTHandler {
  public static generateToken(id: string): string {
    const SECRET = String(process.env.JWT_SECRET);
    const JWT_EXPIRES_IN = String(process.env.JWT_EXPIRES_IN);
    const token = jwt.sign({ id }, SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
  }

  public static validateToken(token: string): Payload | null {
    const SECRET = String(process.env.JWT_SECRET);
    try {
      const result = jwt.verify(token, SECRET) as Payload;
      return result;
    } catch (err) {
      return null;
    }
  }
}
