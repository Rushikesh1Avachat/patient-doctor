// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const openai = new OpenAI({ apiKey: process.env.NEXT_OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userMessage = body.message;

  try {
    // 1. Generate AI reply from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI doctor." },
        { role: "user", content: userMessage },
      ],
    });

    const aiReply = completion.choices[0].message.content;

    // 2. Save chat to Firestore
    await addDoc(collection(db, "chat_logs"), {
      userMessage,
      aiReply,
      createdAt: serverTimestamp(),
    });

    // 3. Return AI reply
    return NextResponse.json({ reply: aiReply });
  } catch (err: any) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
