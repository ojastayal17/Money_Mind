import React, { useState, useRef, useEffect } from "react";
import useChatbot from "../../hooks/usechatbot";

const Chatbot = () => {
  const { processMessage } = useChatbot();
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);

  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botReply = { sender: "bot", text: processMessage(input) };

    setChat((prev) => [...prev, userMsg, botReply]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-5 right-5 md:bottom-8 md:right-8 
          h-14 w-14 md:h-16 md:w-16 
          rounded-full bg-gradient-to-r from-teal-400 to-blue-500 
          shadow-[0_0_20px_rgba(0,255,255,0.6)]
          flex items-center justify-center 
          text-2xl md:text-3xl 
          hover:scale-110 transition-all duration-300
        "
        style={{ zIndex: 9999 }}
      >
        🤖
      </button>

      {/* Chat Popup */}
      {open && (
        <div
          className="
            fixed bottom-24 right-5 md:right-8 
            w-[90vw] md:w-96 
            p-4 rounded-2xl shadow-2xl 
            backdrop-blur-xl bg-[rgba(15,15,25,0.8)]
            border border-[rgba(255,255,255,0.15)]
            animate-slideUp
          "
          style={{ zIndex: 9999 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
              MoneyMind Assistant
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white text-xl transition"
            >
              ✖
            </button>
          </div>

          {/* Chat Window */}
          <div
            className="
              max-h-[60vh] md:h-72 
              overflow-y-auto mb-3 p-2 space-y-3 
              scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
            "
          >
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-2 rounded-xl text-sm leading-relaxed
                    ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                        : "bg-gray-800 text-gray-100 border border-gray-700"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={bottomRef}></div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="
                flex-1 p-2 rounded-xl 
                bg-gray-800 border border-gray-700 
                text-white placeholder-gray-400 
                focus:ring-2 focus:ring-blue-500 
                outline-none text-sm
              "
              placeholder="Ask something..."
            />

            <button
              onClick={sendMessage}
              className="
                px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 
                text-white text-sm md:text-base 
                shadow-lg transition
              "
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.35s ease-out;
        }
        `}
      </style>
    </>
  );
};

export default Chatbot;
