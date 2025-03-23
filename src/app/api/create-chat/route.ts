import { LoadS3IntoPinecone } from "@/lib/Pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body; // Ensure body is an object

    console.log(file_key, file_name);

    if (!file_key) {
      return NextResponse.json({ error: "file_key is required" }, { status: 400 });
    }

    const pages = await LoadS3IntoPinecone(file_key);
    return NextResponse.json({ pages });

  } catch (error) {
    console.error("Error in /api/create-chat:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
