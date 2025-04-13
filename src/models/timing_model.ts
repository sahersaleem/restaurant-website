

import mongoose from "mongoose";
import { model , models } from "mongoose";
const timingSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
      },
      days: {
        type: String,
        required: true,
      },
      slots: [
        {
          type: String,
          required: true,
        }
      ]
    }, { timestamps: true });

    export const Timing = models.Timing ||model("Timing", timingSchema)
