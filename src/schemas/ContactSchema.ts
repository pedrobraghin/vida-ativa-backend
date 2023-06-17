import { model, Schema } from "mongoose";
import { OutputContactDTO } from "../@types/ContactTypes";

const contactSchema = new Schema<OutputContactDTO>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
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

export const ContactSchema = model("Contact", contactSchema);
