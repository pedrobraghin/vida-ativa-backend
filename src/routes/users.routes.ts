import UsersController from "./../modules/user/UserController";

import { auth } from "../middlewares/auth";
import { Router } from "express";
import imgUpload from "../middlewares/imgUpload";

const userRouter = Router();

userRouter.post("/", UsersController.createUser);
userRouter.post("/login", UsersController.loginUser);

userRouter.get(
  "/email-availability/:email",
  UsersController.verifyEmailAvailability
);

userRouter.use(auth);
userRouter.post("/delete-account", UsersController.deleteUser);
userRouter.post(
  "/profile-pic",
  imgUpload.single("img"),
  UsersController.updateUser
);

userRouter.get("/me", UsersController.getMe);
userRouter.get("/:accountType/:email", UsersController.getUserByEmail);
userRouter.get("/:id", UsersController.getUser);

export { userRouter };
