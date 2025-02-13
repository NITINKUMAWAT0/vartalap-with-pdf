import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
  try {
    // Configure AWS SDK
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID, // Ensure correct env variable
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      region: "ap-southeast-1", // Set region here
    });

    const s3 = new AWS.S3();

    const fileKey = `uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: file,
      ContentType: file.type, // Set content type
      ACL: "public-read", // Adjust ACL as needed
    };

    const upload = s3
      .upload(params)
      .on("httpUploadProgress", (event) => {
        console.log(`Uploading to S3: ${Math.round((event.loaded * 100) / event.total)}%`);
      })
      .promise();

    await upload;

    console.log("Successfully uploaded to S3!", fileKey);

    return {
      fileKey,
      fileName: file.name,
    };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload file to S3");
  }
}

export function getS3Url(fileKey: string) {
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${fileKey}`;
}
