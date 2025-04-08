import { Schema  , model , models} from "mongoose";

const LoginSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  role: {
    type: String,
    enum: ["admin", "moderator", "user", "owner"],
    default: "user",
  },
},{timestamps:true});




export const LoginModel = models.LoginModel ||model("LoginModel", LoginSchema)