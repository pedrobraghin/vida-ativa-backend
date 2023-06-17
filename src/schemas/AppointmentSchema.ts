import { model, Schema } from "mongoose";
import { OutputAppointmentDTO } from "../@types/AppointmentTypes";

const appointmentSchema = new Schema<OutputAppointmentDTO>(
  {
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    doctor: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
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

export const AppointmentSchema = model("Appointment", appointmentSchema);
