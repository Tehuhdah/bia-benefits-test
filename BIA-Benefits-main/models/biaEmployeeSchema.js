import { Schema, model, models } from "mongoose";

const biaEmployeeSchema = new Schema(
  {
    employee_name: {
      type: String,
      required: true,
    },
    employee_email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists!"],
      match: [
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "Email is invalid!",
      ],
    },
    user_type: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "biaBenefitsEmployees" }
);

const BiaEmp =
  models.biaBenefitsEmployees || model("biaBenefitsEmployees", biaEmployeeSchema);

export default BiaEmp;
