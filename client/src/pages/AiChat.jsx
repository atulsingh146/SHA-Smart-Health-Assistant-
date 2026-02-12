import { useEffect, useState, useRef } from "react";
import { sendChatMessage, getChatHistory } from "../services/chatService";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getChatHistory();
        setMessages(data);
      } catch (err) {
        console.error("History error:", err);
      }
    })();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const tempUser = {
      _id: "temp-" + Date.now(),
      role: "user",
      message: text,
    };

    setMessages((prev) => [...prev, tempUser]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendChatMessage(text);

      setMessages((prev) => {
        const filtered = prev.filter((m) => m._id !== tempUser._id);

        if (response?.user && response?.assistant) {
          return [...filtered, response.user, response.assistant];
        }

        return filtered;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[80vh] bg-white rounded-2xl shadow p-6 m-15  bg-gradient-to-br from-violet-50 to-white  rounded-3xl p-4 shadow-md">
      <h1 className="text-xl font-bold mb-4">AI Health Chat</h1>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg) => (
          <div
            key={msg._id || Math.random()}
            className={`p-3 rounded-xl max-w-[75%] whitespace-pre-line ${
              msg.role === "user"
                ? "bg-teal-500 text-white ml-auto"
                : "bg-slate-100"
            }`}
          >
            {msg.message}
          </div>
        ))}

        {loading && (
          <div className="bg-slate-100 p-3 rounded-xl w-fit">
            Typing...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask health related question..."
          className="flex-1 border rounded-xl p-3 resize-none"
          rows={1}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-teal-500 text-white px-5 rounded-xl disabled:bg-slate-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}
