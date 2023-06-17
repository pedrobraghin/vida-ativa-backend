import { model, Schema } from "mongoose";
import { OutputMedicationDTO } from "../@types/MedicationsTypes";

const medicationSchema = new Schema<OutputMedicationDTO>(
  {
    posology: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    img: {
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

export const MedicationSchema = model("Medication", medicationSchema);
