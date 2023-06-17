import { Router } from "express";
import { auth } from "../middlewares/auth";

import FriendsController from "../modules/friends/FriendsController";

const friendsRouter = Router();

friendsRouter.use(auth);

friendsRouter.get("/", FriendsController.getUserFriends);
friendsRouter.post("/request/send/:id", FriendsController.sendFriendRequest);
friendsRouter.patch(
  "/request/decline/:id",
  FriendsController.declineFriendRequest
);
friendsRouter.patch(
  "/request/accept/:id",
  FriendsController.acceptFriendRequest
);
friendsRouter.patch(
  "/request/cancel/:id",
  FriendsController.deleteFriendRequest
);

friendsRouter.get("/requests", FriendsController.getFriendRequests);
friendsRouter.delete("/friendship/:id", FriendsController.deleteFriendship);

friendsRouter.get("/requests/sent", FriendsController.getSentRequests);

export { friendsRouter };
