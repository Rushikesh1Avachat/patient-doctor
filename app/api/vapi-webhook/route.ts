// app/api/vapi-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Vapi sends messages like { type: "transcript", transcript: "...", role: "user" }
  const transcript = body.transcript;

  if (!transcript) {
    return NextResponse.json({ error: "Missing transcript" }, { status: 400 });
  }

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // or gpt-4-turbo if you have access
    messages: [
      { role: "system", content: "You are a helpful AI doctor." },
      { role: "user", content: transcript }
    ]
  });

  const reply = chatCompletion.choices[0].message.content;

  return NextResponse.json({ reply });
}
