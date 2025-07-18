import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// These are just type imports, not values — don't try to access methods on them
// import { Messages } from "openai/resources/chat/completions.mjs";
// import { Completions } from "openai/resources";

// Example runtime values you should use instead
const messages = [
  { role: "user", content: "What are the symptoms of flu?" },
];
const completion = {
  choices: [
    { message: { content: "Common symptoms include fever, cough, and fatigue." } },
  ],
};

// ✅ Store actual values, not types
await addDoc(collection(db, "chat_logs"), {
  userMessage: messages.at(-1)?.content ?? "",
  aiReply: completion.choices[0].message.content,
  createdAt: serverTimestamp(),
});

