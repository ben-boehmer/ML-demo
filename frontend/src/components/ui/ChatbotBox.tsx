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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300_000); // 5 Minuten

    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("API URL:", apiUrl); // ← das soll "http://backend:8000" zeigen

    
    try {
      const res = await fetch(apiUrl + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg.text }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error("Fehlerhafte Antwort vom Server");

      const data = await res.json();
      const botMsg = { role: "bot", text: data.response };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const msg =
        err.name === "AbortError"
          ? "Zeitüberschreitung bei der Anfrage."
          : "Fehler bei der Anfrage.";
      setMessages((prev) => [...prev, { role: "bot", text: msg }]);
      console.log("API URL:", import.meta.env.VITE_API_URL);

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
        Frag mich etwas zu Benjamin Böhmer - je nach System kann die Antwort lange dauern.
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
