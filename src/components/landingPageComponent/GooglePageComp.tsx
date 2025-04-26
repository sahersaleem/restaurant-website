"use client";

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";

type Props = {
  address: string;
  restaurantName: string;
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GooglePageComp = ({ address, restaurantName }: Props) => {
  const [coordinate, setCoordinate] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  const fetchCordinates = async () => {
  
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    const data = await res.json();

    if (data.status=="OK") {
      const location = data.results[0].geometry.location;
      setCoordinate(location);
    } else {
      console.error("Geocoding failed:", data.status);
    }
  };

  useEffect(() => {
    fetchCordinates();
  }, [address]);

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-medium font-poppins">Localization</h1>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        {coordinate && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinate}
            zoom={15}
          >
            <Marker position={coordinate} title={restaurantName} />
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default GooglePageComp;
