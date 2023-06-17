import { Request, Response, NextFunction } from "express";

import {
  FriendshipRequestStatus,
  InputFriendRequestDTO,
} from "../../@types/FriendshipTypes";
import FriendsRepository from "./FriendsRepository";
import { EStatusCode } from "../../enums/EStatusCode";
import { GetUserFriendsService } from "./GetUserFriendsService";
import { GetSentRequestsService } from "./GetSentRequestsService";
import { DeleteFriendshipService } from "./DeleteFriendshipService";
import { GetFriendRequestsService } from "./GetFriendRequestsService";
import { SendFriendRequestService } from "./SendFriendRequestService";
import { CatchExpressError } from "../../decorators/CatchExpressErrors";
import { DeleteFriendRequestService } from "./DeleteFriendRequestService";
import { UpdateFriendRequestService } from "./UpdateFriendRequestService";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";

class FriendsController {
  constructor(private friendsRepository: IFriendsRepository) {}

  @CatchExpressError
  async sendFriendRequest(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    const sendFriendRequestService = new SendFriendRequestService(
      this.friendsRepository
    );
    const user = req.app.locals.user;
    const input: InputFriendRequestDTO = {
      receiver: id,
      recipientId: id,
      sender: user._id.toString(),
      user,
    };

    const friendRequest = await sendFriendRequestService.execute(input);
    return res.status(EStatusCode.CREATED).json({
      status: "success",
      data: friendRequest,
    });
  }

  @CatchExpressError
  async deleteFriendRequest(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const deleteFriendRequestService = new DeleteFriendRequestService(
      this.friendsRepository
    );

    const userId = req.app.locals.user._id;

    const friendRequest = await deleteFriendRequestService.execute(id, userId);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
      data: friendRequest,
    });
  }

  @CatchExpressError
  async acceptFriendRequest(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const updateFriendRequestService = new UpdateFriendRequestService(
      this.friendsRepository
    );

    await updateFriendRequestService.execute(
      id,
      req.app.locals.user,
      FriendshipRequestStatus.ACCEPTED
    );

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
    });
  }

  @CatchExpressError
  async declineFriendRequest(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const updateFriendRequestService = new UpdateFriendRequestService(
      this.friendsRepository
    );

    await updateFriendRequestService.execute(
      id,
      req.app.locals.user,
      FriendshipRequestStatus.DENIED
    );

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
    });
  }

  @CatchExpressError
  async getFriendRequests(req: Request, res: Response, _next: NextFunction) {
    const userId = req.app.locals.user._id.toString();
    const getFriendRequestsService = new GetFriendRequestsService(
      this.friendsRepository
    );

    const friendRequests = await getFriendRequestsService.execute({
      recipientId: userId,
    });

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: friendRequests.length,
      data: friendRequests,
    });
  }

  @CatchExpressError
  async getUserFriends(req: Request, res: Response, _next: NextFunction) {
    const userId = req.app.locals.user._id.toString();
    const getUserFriendsService = new GetUserFriendsService(
      this.friendsRepository
    );

    const friends = await getUserFriendsService.execute(userId);

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: friends.length,
      data: friends,
    });
  }

  @CatchExpressError
  async getSentRequests(req: Request, res: Response, _next: NextFunction) {
    const userId = req.app.locals.user._id.toString();

    const getSentRequestsService = new GetSentRequestsService(
      this.friendsRepository
    );

    const sentRequests = await getSentRequestsService.execute(userId);

    return res.status(EStatusCode.OK).json({
      status: "success",
      results: sentRequests.length,
      data: sentRequests,
    });
  }

  @CatchExpressError
  async deleteFriendship(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const deleteFriendshipService = new DeleteFriendshipService(
      this.friendsRepository
    );

    const userId = req.app.locals.user._id;

    await deleteFriendshipService.execute(id, userId);

    return res.status(EStatusCode.NO_CONTENT).json({
      status: "success",
    });
  }
}

export default new FriendsController(FriendsRepository);
