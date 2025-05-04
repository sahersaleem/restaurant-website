import { NextApiRequest, NextApiResponse } from "next";
import { Restaurant } from "@/models/Restaurant";
import dbConnect from "@/lib/db";

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    await dbConnect();
    const { query } = request.query;

    if (!query || typeof query !== "string") {
      return response.status(400).json({ message: "Invalid query" });
    }

    const suggestions = await Restaurant.find({
      $or: [
        { restaurantName: { $regex: query, $options: "i" } },
        { cuisineType: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
      ],
    }).limit(5);

    response.status(200).json(suggestions);
  } catch (error) {
    response.status(500).json({ message: "Error fetching suggestions" });
  }
}
