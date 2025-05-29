"use client";
import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

const sendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;
  const userMsg = { role: "user", content: input };
  setMessages(prev => [...prev, userMsg]);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/gemini-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  console.log("Gemini FE válasz (data):", data); // << itt lásd!
  setMessages(prev => [...prev, { role: "gemini", content: data.reply }]);
  } catch (err) {
    setMessages(prev => [...prev, { role: "gemini", content: "Sorry, Gemini is unavailable." }]);
  }
  setLoading(false);
};

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-background rounded-2xl shadow-lg flex flex-col z-50">
      <div className="p-4 flex-1 overflow-y-auto h-64">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left text-primary"}`}>
            <span className="block px-2 py-1 rounded bg-muted">{msg.content}</span>
          </div>
        ))}
        {loading && <div className="text-sm text-muted">Gemini is typing...</div>}
      </div>
      <form onSubmit={sendMessage} className="flex border-t">
        <input
          className="flex-1 p-2 bg-transparent outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask how to be more eco-friendly..."
        />
        <button type="submit" className="p-2 text-primary" disabled={loading}>Send</button>
      </form>
    </div>
  );
};

export default Chat;