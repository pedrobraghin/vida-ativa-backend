import { model, Schema } from "mongoose";
import { OutputHealthDataDTO } from "../@types/HealthDataTypes";

export const healthDataSchema = new Schema<OutputHealthDataDTO>(
  {},
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

export const HealthDataSchema = model("HealthData", healthDataSchema);
