import { Schema, model } from "mongoose";
import { OutputFriendRequestDTO } from "../@types/FriendshipTypes";

const friendshipRequestSchema = new Schema<OutputFriendRequestDTO>(
  {
    recipientId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    sender: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    receiver: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: Number,
      min: 0,
      max: 2,
      default: 0,
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

export const FriendRequestSchema = model(
  "FriendshipRequest",
  friendshipRequestSchema
);
