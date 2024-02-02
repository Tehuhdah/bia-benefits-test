import { Schema, model, models } from "mongoose";

// Defining the Employee schema
const EmployeeSchema = new Schema({
  employee_ui: {
    type: String,
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

// Defining the Business schema
const EmpBusinessSchema = new Schema({
  biz_ui: {
    type: Number,
    required: true,
  },
  business_ui: {
    type: Number,
    required: true,
  },
  employees: [EmployeeSchema],
},
{ collection: "businesses" }
);

const EMP = models.employees || model('employees', EmpBusinessSchema);

export default EMP;
