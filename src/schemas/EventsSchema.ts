import { model, Schema } from "mongoose";
import { OutputUserEventsTypeDTO } from "../@types/EventsTypes";

const eventsSchema = new Schema<OutputUserEventsTypeDTO>(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
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

export const EventsSchema = model("Events", eventsSchema);
