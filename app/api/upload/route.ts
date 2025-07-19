// app/api/upload/route.ts
"use server"
import { NextResponse } from 'next/server';
//@ts-ignore

import { Client, ID, Storage }  from 'appwrite';
import fs from 'fs';
import path from 'path';
import { BUCKET_ID } from '@/lib/appwrite.config';
import { Blob } from 'node:buffer';
import { arrayBuffer, blob } from 'node:stream/consumers';

export async function POST(req: Request) {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.PROJECT_ID!)
   //@ts-ignore
    .setKey(process.env.API_KEY!);

  const storage = new Storage(client);

  // Example: Local file (for testing)
//  const blob = FormData.get("blobFile") as Blob;
// const fileName = FormData.get("fileName") as string;
// const stream = ReadableStream(); // ReadableStream or fs.createReadStream()

 //@ts-ignore
 const blobData = new Blob([arrayBuffer], { type: "application/pdf" });
 //@ts-ignore
const file = new File([blobData], 'yourFilename.ext');
await storage.createFile(BUCKET_ID!, ID.unique(), file);

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
