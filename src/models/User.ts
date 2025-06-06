import { Schema  , model , models} from "mongoose";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  forename:{type:String , required:true},
  town:{type:String , required:true},
  date_of_birth:{type:Date , required:true},
  role: {
    type: String,
    enum: ["admin", "moderator", "user", "owner"],
    default: "user",
  },
},{timestamps:true});




export const User = models.User ||model("User", UserSchema)