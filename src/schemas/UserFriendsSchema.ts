import { Schema, model } from "mongoose";
import { OutputUserFriendDTO } from "../@types/FriendshipTypes";

const userFriendsSchema = new Schema<OutputUserFriendDTO>(
  {
    userOne: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userTwo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const UserFriendsSchema = model("UserFriends", userFriendsSchema);
