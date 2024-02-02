import { Schema, model, models } from "mongoose";

const bizSchema = new Schema(
  {
    biz_ui: {
      type: Number,
    },
    biz_name: {
      type: String,
      required: [true, "Name is required."],
    },
    street: {
      type: String,
      required: [true, "Street is required."],
    },
    city: {
      type: String,
      required: [true, "City is required."],
    },
    province: {
      type: String,
      required: [true, "Province is required."],
    },
    postal_code: {
      type: String,
      required: [true, "Postal Code is required."],
    },
    contact_person: {
      type: String,
      required: [true, "Contact Person is required."],
    },
    phone_number: {
      type: String,
      required: [true, "Address is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists!"],
      match: [
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "Email is invalid!",
      ],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "biz" }
);

const BIZ = models.biz || model("biz", bizSchema);

export default BIZ;
