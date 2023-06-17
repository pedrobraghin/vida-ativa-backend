import { Request, Response, NextFunction } from "express";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "./UsersRepository";
import {
  AccountTypes,
  InputUserDTO,
  OutputUserDTO,
} from "../../@types/UserTypes";
import { EStatusCode } from "../../enums/EStatusCode";
import { CreateUserService } from "./CreateUserService";
import { SignInUserService } from "./SignInUserService";
import { CookieUtils } from "../../utils/CookieUtils";
import { VerifyEmailAvailabilityService } from "./VerifyEmailAvailabilityService";
import { JWTHandler } from "../../jwt/JWTHandler";
import { GetUserService } from "./GetUserService";
import { DeleteUserService } from "./DeleteUserService";
import { GetUserByEmailService } from "./GetUserByEmailService";
import { UpdateUserService } from "./UpdateUserService";

class UsersController {
  constructor(private usersRepository: IUsersRepository) {}

  @CatchExpressError
  async createUser(req: Request, res: Response, _next: NextFunction) {
    const input: InputUserDTO = req.body;

    const createUserService = new CreateUserService(this.usersRepository);
    const user = await createUserService.execute(input);

    const token = JWTHandler.generateToken(user._id);
    CookieUtils.sessionCookie(res, token);

    return res.status(EStatusCode.CREATED).json({
      status: "success",
      token,
      data: user,
    });
  }

  @CatchExpressError
  async loginUser(req: Request, res: Response, _next: NextFunction) {
    const { email, password } = req.body;
    const signInUserService = new SignInUserService(this.usersRepository);
    const token = await signInUserService.execute(email, password);

    CookieUtils.sessionCookie(res, token);

    return res.status(EStatusCode.OK).json({
      status: "success",
      token,
    });
  }

  @CatchExpressError
  async getMe(req: Request, res: Response, _next: NextFunction) {
    return res.status(EStatusCode.OK).json({
      status: "success",
      data: req.app.locals.user,
    });
  }

  @CatchExpressError
  async getUserByEmail(req: Request, res: Response, _next: NextFunction) {
    const { email, accountType } = req.params;
    const loggedUser: OutputUserDTO = req.app.locals.user;
    const accountTypeNumber = Number(accountType);
    const userAccountType =
      accountTypeNumber === AccountTypes.CAREGIVER
        ? AccountTypes.CAREGIVER
        : AccountTypes.ELDERLY;

    if (loggedUser.accountType === userAccountType) {
      return res.status(EStatusCode.FORBIDDEN).json({
        status: "fail",
        message: "You are not allowed to search this kind of user.",
      });
    }

    const getUserByEmailService = new GetUserByEmailService(
      this.usersRepository
    );
    const user = await getUserByEmailService.execute(
      {
        email,
        accountType: userAccountType,
      },
      loggedUser
    );

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: user,
    });
  }

  @CatchExpressError
  async getUser(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const accountType = req.app.locals.user.accountType;
    const getUserService = new GetUserService(this.usersRepository);
    const user = await getUserService.execute(id, accountType);

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: user,
    });
  }

  @CatchExpressError
  async verifyEmailAvailability(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { email } = req.params;
    const verifyEmailAvailabilityService = new VerifyEmailAvailabilityService(
      this.usersRepository
    );
    const isEmailAvailable = await verifyEmailAvailabilityService.execute(
      email
    );

    return res.status(EStatusCode.OK).json({
      status: "success",
      data: {
        available: isEmailAvailable,
      },
    });
  }

  @CatchExpressError
  async deleteUser(req: Request, res: Response, _next: NextFunction) {
    const userId = req.app.locals.user._id.toString();
    const { password } = req.body;

    const deleteUserService = new DeleteUserService(this.usersRepository);
    const deletedUser = await deleteUserService.execute(userId, password);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: deletedUser,
    });
  }

  @CatchExpressError
  async updateUser(req: Request, res: Response, _next: NextFunction) {
    const userId = req.app.locals.user._id.toString();
    const input: InputUserDTO = req.body;

    if (req.file) {
      const host = req.get("host");
      const imageUrl = `http://${host}/${req.file.filename}`;
      input.img = {
        regular: imageUrl,
      };
      console.log(imageUrl);
    }

    const updateUserService = new UpdateUserService(this.usersRepository);
    const updatedUser = await updateUserService.execute(userId, input);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: updatedUser,
    });
  }
}

export default new UsersController(UsersRepository);
