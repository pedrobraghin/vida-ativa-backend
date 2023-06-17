import {
  FriendshipRequestStatus,
  InputFriendRequestDTO,
  OutputFriendRequestDTO,
  InputUserFriendDTO,
  OutputUserFriendDTO,
} from "../../@types/FriendshipTypes";
import { FriendRequestSchema } from "../../schemas/FriendRequestSchema";
import { UserFriendsSchema } from "../../schemas/UserFriendsSchema";
import { UserSchema } from "../../schemas/UserSchema";
import { IFriendsRepository } from "../IFriendsRepository";

export class MongoFriendsRepository implements IFriendsRepository {
  async getSentRequests(userId: string): Promise<OutputFriendRequestDTO[]> {
    const sentRequests = await FriendRequestSchema.find({
      senderId: userId,
    }).populate("receiver");

    return sentRequests;
  }

  async getUserFriends(userId: string): Promise<OutputUserFriendDTO[]> {
    const friends = await UserFriendsSchema.find({
      $or: [{ userOne: userId }, { userTwo: userId }],
    })
      .populate({
        path: "userOne",
        match: {
          _id: { $ne: userId },
        },
        select: "name fullName email img",
      })
      .populate({
        path: "userTwo",
        match: {
          _id: { $ne: userId },
        },
        select: "name fullName email img",
      });

    return friends;
  }

  async getFriendRequests(
    input: Partial<InputFriendRequestDTO>
  ): Promise<OutputFriendRequestDTO[]> {
    const requests = await FriendRequestSchema.find(input).populate({
      path: "sender",
      select: "fullName name email id img",
    });
    return requests;
  }

  async getFriendRequest(
    senderId: string,
    recipientId: string
  ): Promise<OutputFriendRequestDTO | null> {
    const request = await FriendRequestSchema.findOne({
      senderId,
      recipientId,
    });

    return request;
  }

  async sendFriendRequest(
    input: InputFriendRequestDTO
  ): Promise<OutputFriendRequestDTO | null> {
    const recipient = await UserSchema.findById(input.recipientId);

    if (!recipient) {
      return null;
    }

    if (recipient.accountType === input.user.accountType) {
      return null;
    }

    const alreadyFriends = await UserFriendsSchema.findOne({
      $or: [
        { userOne: input.sender, userTwo: input.recipientId },
        { userOne: input.recipientId, userTwo: input.sender },
      ],
    });

    if (alreadyFriends) {
      return null;
    }

    const request = await FriendRequestSchema.create({
      ...input,
      status: FriendshipRequestStatus.PENDING,
    });

    return request;
  }

  async verifyFriendship(userOne: string, userTwo: string): Promise<boolean> {
    const alreadyFriends = await UserFriendsSchema.findOne({
      $or: [
        { userOne, userTwo },
        { userOne: userTwo, userTwo: userOne },
      ],
    });
    return !!alreadyFriends;
  }

  async acceptFriendRequest(
    id: string,
    userId: string
  ): Promise<OutputFriendRequestDTO | null> {
    const request = await FriendRequestSchema.findByIdAndDelete(id, {
      senderId: userId,
    });

    return request;
  }

  async declineFriendRequest(
    id: string,
    userId: string
  ): Promise<OutputFriendRequestDTO | null> {
    const request = await FriendRequestSchema.findByIdAndDelete(id, {
      senderId: userId,
    });

    return request;
  }

  async deleteFriendRequest(
    id: string,
    userId: string
  ): Promise<OutputFriendRequestDTO | null> {
    const request = await FriendRequestSchema.findByIdAndDelete(id, {
      senderId: userId,
    });

    return request;
  }

  async deleteUserFriendships(userId: string): Promise<void> {
    await UserFriendsSchema.deleteMany({
      $or: [{ userOne: userId }, { userTwo: userId }],
    });
  }

  async deleteUserFriendRequests(userId: string): Promise<void> {
    await FriendRequestSchema.deleteMany({
      $or: [{ senderId: userId }, { recipientId: userId }],
    });
  }

  async createFriendship(
    input: InputUserFriendDTO
  ): Promise<OutputUserFriendDTO> {
    const userFriend = await UserFriendsSchema.create(input);
    return userFriend;
  }

  async deleteFriendship(
    id: string,
    userId: string
  ): Promise<OutputUserFriendDTO | null> {
    const deletedFriendship = await UserFriendsSchema.findOneAndDelete({
      _id: id,
      $or: [{ userOne: userId }, { userTwo: userId }],
    });

    return deletedFriendship;
  }
}
