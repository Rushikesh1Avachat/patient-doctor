import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import OpenAI from "openai";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const openai = new OpenAI({ apiKey: process.env.NEXT_OPENAI_API_KEY! });
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an AI doctor." },
      { role: "user", content: message },
    ],
  });

  const aiReply = completion.choices[0].message.content;

  await addDoc(collection(db, "chat_logs"), {
    userMessage: message,    // actual value from request
    aiReply: aiReply,        // actual reply from OpenAI
    createdAt: serverTimestamp(),
  });

  return NextResponse.json({ reply: aiReply });
}

