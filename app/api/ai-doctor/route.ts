import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  // Replace with OpenAI logic if needed
  const reply = `Based on your message: "${question}", I recommend rest, hydration, and monitoring symptoms.`;

  return NextResponse.json({ reply });
}
