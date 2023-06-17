import { UsersRepository } from "./../modules/user/UsersRepository";
import { GetUserByIdService } from "./../modules/user/GetUserByIdService";
import { Request, Response, NextFunction } from "express";

import { JWTHandler } from "../jwt/JWTHandler";
import { UnauthorizedError } from "./../errors/UnauthorizedError";

export async function auth(req: Request, _res: Response, next: NextFunction) {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies["jwt"];

    if (!token) {
      return next(new UnauthorizedError("Token is missing."));
    }

    const payload = JWTHandler.validateToken(token);

    if (!payload) {
      return next(new UnauthorizedError("Invalid e-mail or password."));
    }

    const userId = payload.id;
    const getUserService = new GetUserByIdService(UsersRepository);
    const user = await getUserService.execute(userId);

    if (!user) {
      return next(new UnauthorizedError("Invalid e-mail or password."));
    }

    req.app.locals.user = user;
    next();
  } catch (err) {
    return next(new UnauthorizedError("Invalid e-mail or password."));
  }
}
