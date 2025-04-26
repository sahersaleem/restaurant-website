import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fromPath } from "pdf2pic";

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("files");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { message: "File not found or invalid type" },
        { status: 400 }
      );
    }

    // Prepare file paths
    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfId = uuidv4();
    const tempDir = path.join(process.cwd(), "temp");
    const pdfPath = path.join(tempDir, `${pdfId}.pdf`);
    const imagePath = path.join(tempDir, `${pdfId}.jpg`);

    // Ensure temp folder exists
    await fs.mkdir(tempDir, { recursive: true });

    // Save PDF to disk
    await fs.writeFile(pdfPath, buffer);
   const options = {
      density: 100,
      saveFilename: "untitled",
      savePath: "/images",
      format: "png",
      width: 600,
      height: 600
    };
    const convert = fromPath(imagePath, options);
    const pageToConvertAsImage = 1;
    
    const images:any = convert(pageToConvertAsImage, { responseType: "image" })
      .then((resolve) => {
        console.log("Page 1 is now converted as image");
    
        return resolve;
      });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  
      const imageBuffer = images[0]; // First image from PDF

    // Save the image to the disk
    await fs.writeFile(imagePath, imageBuffer);


    // Read image
    const cloudinaryResult = await new Promise<any>((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          { resource_type: "image" , format:"jpg"}, // auto handles different file types
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(imageBuffer);
    });
    const link = cloudinaryResult?.secure_url;
    console.log(link);
    
  
  return NextResponse.json({link})
  
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}