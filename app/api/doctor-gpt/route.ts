import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { patientMessage } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are an experienced medical doctor. Based on the patient's input, respond with a follow-up question or clarification to help diagnose a disease or disorder.",
      },
      {
        role: "user",
        content: patientMessage,
      },
    ],
  });

  const doctorPrompt = completion.choices[0]?.message?.content || "";

  return NextResponse.json({ doctorPrompt });
}
