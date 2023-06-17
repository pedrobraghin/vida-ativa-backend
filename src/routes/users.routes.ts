import UsersController from "./../modules/user/UserController";

import { auth } from "../middlewares/auth";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/", UsersController.createUser);
userRouter.post("/login", UsersController.loginUser);

userRouter.use(auth);
userRouter.delete("/", UsersController.deleteUser);

userRouter.get("/me", UsersController.getMe);
userRouter.get(
  "/email-availability/:email",
  UsersController.verifyEmailAvailability
);
userRouter.get("/:accountType/:email", UsersController.getUserByEmail);
userRouter.get("/:id", UsersController.getUser);

export { userRouter };
