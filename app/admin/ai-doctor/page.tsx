'use client';

import { useEffect, useRef, useState } from 'react';
//@ts-ignore
import Vapi from "@vapi-ai/web";


const AIDoctorPage = () => {
   const vapiRef = useRef<any>(null);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
const [isStarted, setIsStarted]=useState(false)
  // Initialize Vapi once
  useEffect(() => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    vapiRef.current = vapi;

    // Start event handlers
    vapi.on('call-start', () => setIsListening(true));
    vapi.on('call-end', () => setIsListening(false));

    vapi.on('message', (msg: any) => {
      if (msg.type === 'transcript') {
        const role = msg.role === 'user' ? 'Patient' : 'AI Doctor';
        setMessages((prev) => [...prev, { role, content: msg.transcript }]);
      }
    });

    return () => vapi.stop();
  }, []);

  const handlePromptSubmit = async () => {
    const input = prompt.trim();
    if (!input) return;

    setMessages((prev) => [...prev, { role: 'Patient', content: input }]);
    setPrompt('');

    try {
      const res = await fetch('/api/doctor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });

      const { reply } = await res.json();

      setMessages((prev) => [...prev, { role: 'AI Doctor', content: reply }]);

      // ✅ This speaks the response using Vapi
      vapiRef.current?.say(reply);
    } catch (e) {
      console.error('Failed to get AI reply', e);
    }
  };

  const startVoice = async () => {
    try {
      await vapiRef.current?.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
    } catch (err) {
      console.error('Voice start error', err);
    }
  };
   

 
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🩺 AI Doctor Assistant</h1>

      <div className="w-full max-w-2xl space-y-4">
        <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className="mb-2">
              <strong className="text-green-400">{msg.role}:</strong>{' '}
              <span className="text-white">{msg.content}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            placeholder="Type your message to the AI doctor..."
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
          <button
            onClick={handlePromptSubmit}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Send
          </button>
        </div>

        <button
          onClick={startVoice}
          disabled={isStarted}
          className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 mt-4"
        >
          {isStarted ? 'Conversation Active' : '🎤 Start Microphone Chat'}
        </button>
      </div>
    </div>
  );
};

export default AIDoctorPage;



