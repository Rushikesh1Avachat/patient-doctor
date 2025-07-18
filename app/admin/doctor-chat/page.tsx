"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function DoctorChatPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  async function handleSend() {
    if (!input.trim()) return;
    const newChat = [...chat, `🧑‍⚕️ You: ${input}`];
    setChat(newChat);
    setInput("");

    const res = await fetch("/api/doctor-chat", {
      method: "POST",
      body: JSON.stringify({ messages: [{ role: "user", content: input }] }),
    });

    const data = await res.json();
    if (data.reply) {
      setChat((prev) => [...prev, `🤖 AI Doctor: ${data.reply}`]);
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="bg-gray-100 p-4 rounded h-[400px] overflow-y-auto">
        {chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI doctor..."
          className="w-full"
        />
        <Button onClick={handleSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
