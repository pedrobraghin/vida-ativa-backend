import { Schema, model } from "mongoose";
import { OutputMedicationHistoryDTO } from "../@types/NotificationsTypes";

const medicationHistorySchema = new Schema<OutputMedicationHistoryDTO>(
  {
    date: {
      type: String,
      default: Date.now(),
    },
    isIngested: {
      type: Boolean,
      required: true,
    },
    medicationId: {
      type: String,
      ref: "Medication",
      required: true,
    },
    userId: {
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

export const MedicationHistorySchema = model(
  "MedicationHistory",
  medicationHistorySchema
);
