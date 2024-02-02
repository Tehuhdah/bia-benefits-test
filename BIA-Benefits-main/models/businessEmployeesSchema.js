import { Schema, model, models } from "mongoose";

const EmployeesSchema = new Schema({
  employee_ui: {
    type: Number,
    required: true,
  },
  name: {
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
  email: {
    type: String,
    default: "",
    match: [
      /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      "Email is invalid!",
    ],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const BusinessSchema = new Schema(
  {
    biz_ui: {
      type: Number,
    },
    business_ui: {
      type: Number,
      required: true,
    },
    business_name: {
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
      required: [true, "Address is required."],
    },
    email: {
      type: String,
      default: "",
      match: [
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "Email is invalid!",
      ],
    },
    status: {
      type: Boolean,
      default: true,
    },
    employees: [EmployeesSchema],
  },
  { collection: "businesses" }
);

const BUS = models.businesses || model("businesses", BusinessSchema);

export default BUS;
