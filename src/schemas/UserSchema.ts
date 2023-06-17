import { Schema, model } from "mongoose";
import { OutputUserDTO } from "../@types/UserTypes";

const userSchema = new Schema<OutputUserDTO>(
  {
    name: {
      type: Object,
      first: {
        minlength: 2,
        type: String,
        required: true,
      },
      last: {
        minlength: 2,
        type: String,
        required: true,
      },
      required: true,
    },
    fullName: {
      type: String,
    },
    img: {
      type: Object,
      regular: {
        type: String,
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    accountType: {
      type: Number,
      min: 0,
      max: 1,
    },
    birthDate: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: Object,
      name: String,
      phoneNumber: String,
      img: {
        type: String,
      },
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

userSchema.pre("save", function () {
  this.fullName = `${this.name.first} ${this.name.last}`;
});

export const UserSchema = model("User", userSchema);
