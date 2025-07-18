// app/api/upload/route.ts
"use server"
import { NextResponse } from 'next/server';
//@ts-ignore

import { Client, Storage, InputFile }  from 'appwrite';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.PROJECT_ID!)
   //@ts-ignore
    .setKey(process.env.API_KEY!);

  const storage = new Storage(client);

  // Example: Local file (for testing)
  const filePath = path.join(process.cwd(), 'public/sample.pdf');

  const file = InputFile.fromPath(filePath, 'sample.pdf');

  try {
    const response = await storage.createFile(
      process.env.NEXT_PUBLIC_BUCKET_ID!,
      'unique()', // auto-generated ID
      file
    );

    return NextResponse.json({ success: true, fileId: response.$id });
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed', detail: err }, { status: 500 });
  }
}
