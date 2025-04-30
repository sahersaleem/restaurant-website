import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import axios from "axios";

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { uploaded_url } = await request.json();

    // Download PDF as buffer
    const response = await axios.get(uploaded_url, { 
      responseType: 'arraybuffer',
      timeout: 160000,
    });

    const buffer = Buffer.from(response.data);

    // Save temporarily
    fs.writeFileSync("temp.pdf", buffer);

    // Upload to Cloudinary, extract first page
    const cloudinaryResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: "image",
          format: "jpg",
          pages: true, // Important: Allow page-based transformation
          transformation: [
            { width: 600, height: 800, crop: "fill", page: 1 }
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    // Clean up
    fs.unlinkSync("temp.pdf");

    const link = cloudinaryResult?.secure_url;
    console.log(link);
    


    return NextResponse.json({ link });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
