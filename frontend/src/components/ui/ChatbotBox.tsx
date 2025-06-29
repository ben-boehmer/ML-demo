import React, { useState, useEffect, useRef } from "react";

export default function ChatbotBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg.text }),
      });
      const data = await res.json();
      const botMsg = { role: "bot", text: data.response };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Fehler bei der Anfrage." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      <h2 style={{ fontWeight: "bold", marginBottom: 4 }}>🤖 Chatbot - LLM</h2>
      <p style={{ fontSize: 14, marginBottom: 12, color: "#666" }}>
        Frag mich etwas zu Benjamin Böhmer
      </p>
      <div
        style={{
          height: 200,
          overflowY: "auto",
          marginBottom: 12,
          padding: 8,
          backgroundColor: "#f0f0f0",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{ textAlign: msg.role === "user" ? "right" : "left", marginBottom: 8 }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 10,
                backgroundColor: msg.role === "user" ? "#007bff" : "#ddd",
                color: msg.role === "user" ? "#fff" : "#000",
              }}
            >
              <strong>{msg.role === "user" ? "Du" : "Chatbot"}:</strong> {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1, padding: 8, borderRadius: 4 }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Deine Nachricht..."
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "..." : "Senden"}
        </button>
      </div>
    </div>
  );
}
