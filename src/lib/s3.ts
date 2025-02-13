import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
  try {
    // AWS Configuration
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_S3_REGION, // Ensure this is set
    });

    const s3 = new AWS.S3();

    // Upload parameters
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: `uploads/${Date.now()}-${file.name}`, // Unique key
      Body: file,
      ContentType: file.type,
      ACL: "public-read", // Adjust as per your needs
    };

    // Upload file
    const uploadResult = await s3.upload(params).promise();
    
    return uploadResult.Location; // Returns file URL

  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
}
