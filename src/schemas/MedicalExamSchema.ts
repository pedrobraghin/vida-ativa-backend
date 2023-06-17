import { model, Schema } from "mongoose";
import { OutputMedicalExamDTO } from "../@types/MedicalExamTypes";
import { healthDataSchema } from "./HealthDataSchema";

const medicalExamSchema = new Schema<OutputMedicalExamDTO>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    healthData: {
      type: healthDataSchema,
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

export const MedicalExamSchema = model("MedicalExam", medicalExamSchema);
