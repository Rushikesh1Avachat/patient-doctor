//@ts-ignore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
//@ts-ignore
import {db} from "@/lib/firebase.config"
//@ts-ignore
import OpenAI from "openai";
//@ts-ignore
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
//@ts-ignore
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

