import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/chatsCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);


 const token = localStorage.getItem("token") || 1;
useEffect(() => {
  fetch(`/api/chats/${token}`)
    .then((res) => res.json())
    .then((data) => setChats(data))
    .catch((err) => console.error("Failed to fetch chats:", err));
}, [token]);

  // Завантажуємо повідомленя
  useEffect(() => {
  if (selectedChatId !== null) {
    fetch(`/api/messages/${selectedChatId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Failed to fetch messages:", err));
  }
}, [selectedChatId]);

  // Прокрутка до останнього повідомлення
useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  // Надсилання повідомлення
 const sendMessage = () => {
  if (messageInput.trim() === "" || selectedChatId === null) return;

  fetch("/api/message", {  // змінив URL на /api/message
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatID: selectedChatId,
      senderID: token, // передаємо правильний userID
      text: messageInput,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    })
    .then(() => {
      setMessageInput("");
      return fetch(`/api/messages/${selectedChatId}`);
    })
    .then((res) => res.json())
    .then((data) => setMessages(data))
    .catch((err) => console.error("Sending error:", err));
};


  return (
    <>
    <MyHeader/>
    <div className="chat-page">
      <div className="chat-list">
        <h2>Чати</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              style={{
                fontWeight: selectedChatId === chat.id ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-window">
        {selectedChatId ? (
          <>
            <h2>Повідомлення</h2>
            <div className="message-list" style={{ height: 300, overflowY: "auto" }}>
  {messages.map((msg) => (
    <div key={msg.id}>
      <b>Користувач {msg.senderID}:</b> {msg.text}
    </div>
  ))}
  <div ref={messagesEndRef} />
              </div>
              

            <div className="message-input">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage}>Надіслати</button>
            </div>
          </>
        ) : (
          <p>Виберіть чат, щоб побачити повідомлення</p>
        )}
      </div>
      </div>
      <MyFooter/>
      </>
  );
}
