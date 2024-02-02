import { Schema, model, models } from "mongoose";

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String},
    image: {type: String},
    status: {type: Boolean, default: true}
  }
)

const corporatePartnerSchema = new Schema(
  {
    partner_name: {
      type: String,
      required: true,
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
      required: true,
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
    products: [productsSchema],
  },
  { collection: "corporatePartners" }
);

const CorporatePartners =
  models.corporatePartners ||
  model("corporatePartners", corporatePartnerSchema);

export default CorporatePartners;
