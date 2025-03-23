import AWS from "aws-sdk";
import fs from "fs";

export async function downloadFromS3(file_key: string) {
    try {
        const s3 = new AWS.S3({
            region: "ap-south-1",
            credentials: {
                accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
            },
        });

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
            Key: file_key,
        };

        const data = await s3.getObject(params).promise();
        
        if (!data.Body) {
            throw new Error("S3 object has no body");
        }

        const file_name = `/tmp/pdf-${Date.now()}.pdf`;
        fs.writeFileSync(file_name, data.Body as Buffer);
        
        console.log(`File saved: ${file_name}`);
        return file_name;
    } catch (error) {
        console.error("Error downloading from S3:", error);
        return null;
    }
}