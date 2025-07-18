import { db } from "@/lib/firebase"; // Firebase initialization
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ✅ These must be actual runtime values
const messages = [
  { role: "user", content: "What are the symptoms of flu?" },
  // other message objects...
];

const completion = {
  choices: [
    {
      message: {
        content: "Common symptoms include fever, cough, and fatigue.",
      },
    },
  ],
};

// ✅ Firestore logging
await addDoc(collection(db, "chat_logs"), {
  userMessage: messages.at(-1)?.content ?? "",  // Safe optional chaining
  aiReply: completion.choices?.[0]?.message?.content ?? "", // Safe chaining
  createdAt: serverTimestamp(), // Optional: use `new Date()` if you prefer
});

