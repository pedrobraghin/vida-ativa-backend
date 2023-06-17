import { Schema, model } from "mongoose";
import { OutputReminderDTO } from "../@types/ReminderTypes";

const reminderSchema = new Schema<OutputReminderDTO>(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
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

export const ReminderSchema = model("Reminder", reminderSchema);
