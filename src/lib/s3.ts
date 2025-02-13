import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

export async function uploadToS3(file: File): Promise<{ file_key: string; file_name: string }> {
  try {
    console.log(process.env);
    // Debugging logs to check environment variables
    console.log("AWS Bucket Name:", process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME);
    console.log("AWS Region:", process.env.NEXT_PUBLIC_AWS_REGION);
    console.log("aws access key", process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID);
    console.log("awd secret key", process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY);
    


    if (!process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME) {
      throw new Error("Missing AWS_S3_BUCKET_NAME environment variable.");
    }

    const s3 = new S3({
      region: process.env.NEXT_PUBLIC_AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const file_key = `uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const arrayBuffer = await file.arrayBuffer();
    const fileBody = new Uint8Array(arrayBuffer);

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: file_key,
      Body: fileBody,
      ContentType: file.type,
    };

    console.log("Uploading to S3 with params:", params);
    await s3.send(new PutObjectCommand(params));

    console.log("Upload successful:", file_key);
    return { file_key, file_name: file.name };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
}
