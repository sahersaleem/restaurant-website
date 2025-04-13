import { Schema, model, models } from "mongoose";
const RestaurantSchema = new Schema(
  {
    restaurantName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    cuisineType: { type: String, required: false },

    password: { type: String, required: true },
    pdfLinks: { type: String , required: false},

    description: { type: String , required: false},
    phoneNumber: { type: String , required: false},
    googlePage: { type: String , required: false},
    website_link: { type: String , required: false},
    logo: { type: String },

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
