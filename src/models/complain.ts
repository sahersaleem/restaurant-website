import { Schema, model, models } from "mongoose";

const ComplainSchema: Schema = new Schema(
  {
    subject: { type: String, required: true },
    complain: { type: String, required: true },
    isResolved:{type:Boolean , default:false ,required: true}
 

  },
  { timestamps: true }
);

export const Complain = models.Complain || model("Complain", ComplainSchema);
