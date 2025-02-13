import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

export async function uploadToS3(file: File): Promise<{ file_key: string; file_name: string }> {
  try {
    console.log("AWS Bucket Name:", process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME);
    console.log("AWS Region:",process.env.NEXT_PUBLIC_AWS_REGION);
    console.log("AWS Access Key:", process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID);
    console.log("AWS Secret Key:", process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID);

    const s3 = new S3({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
      },
    });

    const file_key = `uploads/${Date.now().toString()}-${file.name.replace(/\s+/g, "-")}`;
    console.log("Generated File Key:", file_key);

    // Convert File to Uint8Array
    const arrayBuffer = await file.arrayBuffer();
    const fileBody = new Uint8Array(arrayBuffer);

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: file_key,
      Body: fileBody, // 🔥 Fix: Pass Uint8Array instead of File
      ContentType: file.type, // Set content type for correct file handling
    };

    console.log("S3 Upload Params:", JSON.stringify(params, null, 2));

    const result = await s3.send(new PutObjectCommand(params));
    console.log("S3 Upload Success:", result);

    return { file_key, file_name: file.name };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file_key}`;
  console.log("Generated S3 URL:", url);
  return url;
}
