import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  filePath,
  folder,
  transformations = []
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      transformation: [
        ...transformations,
        {
          width: 600,
          height: 600,
          crop: "fill",
          gravity: "face",
        },
      ],
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
  }
};
