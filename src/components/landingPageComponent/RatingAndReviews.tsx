"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { LuLoader } from "react-icons/lu";

interface IReviews {
  rating: number;
  reviews: string;
  createdAt: any;
}

const RatingAndReviews = () => {
  const [rating, setRating] = useState<number>(0);
  const [reviews, setReviews] = useState<string>("");
  const [data, setData] = useState<IReviews[] | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const { id } = useParams();

  const fetchReviews = async () => {
    try {
      
      const res = await axios.get(`/api/reviews?restaurantId=${id}`);
      setData(res.data);
     
    } catch (error) {
      console.error(error);
    
    }
  };

  const submitReview = async () => {
    try {
      setProcessing(true)
      await axios.post("/api/reviews", {
        restaurantId: id,
        rating,
        reviews,
      });
      setProcessing(false)
      setReviews("");
      setRating(0);
      fetchReviews();
    } catch (error) {
      console.error(error);
      setProcessing(false)
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  return (
    <div className="mt-20">
      <h3 className="text-4xl font-comic font-semibold">Rating and Reviews</h3>

      <div className="flex flex-col w-1/2 gap-y-3">
        <h3 className="text-2xl font-comic mt-10">Leave a review!</h3>
        <div className="flex ">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)}>
              {star <= rating ? "⭐" : "☆"}
            </button>
          ))}
        </div>
        <textarea
          value={reviews}
          onChange={(e) => setReviews(e.target.value)}
          placeholder="Write your feedback here..."
        />
        <Button className="bg-red hover:bg-red" onClick={submitReview}>
          {processing ? (
            <LuLoader className="animate-spin" />
          ) : (
            "Submit reviews"
          )}
        </Button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 mt-10">Customer Reviews</h2>
        {data && data.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {data?.map((review: any) => (
              <div key={review._id} className="border p-4 rounded shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Rating:</span>
                  <span>{review.rating} ⭐</span>
                </div>
                <p className="text-gray-700">{review.review}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingAndReviews;
