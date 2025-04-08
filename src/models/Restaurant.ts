import { Schema, model, models } from "mongoose";

const RestaurantSchema = new Schema(
  {
    restaurantName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    cuisineType: { type: String, required: true },

    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    pdfLinks:{type:String , required:false},

    description: { type: String },

    openingTime: { type: String },
    closingTime: { type: String },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "LoginModel",
      required: true,
    },
  },
  { timestamps: true }
);

export const Restaurant =
  models.Restaurant || model("Restaurant", RestaurantSchema);
