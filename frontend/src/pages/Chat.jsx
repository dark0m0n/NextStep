import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/chatsCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";
import {chats, chatMembers, messages } from "../mockDataBase";

export default function ChatPage() {
  const [chatList, setChatList] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  // Завантажуємо чати, в яких є користувач
  useEffect(() => {
    // Знаходимо chatId, де є поточний користувач
    const myChatIds = chatMembers
      .filter((cm) => cm.user.id === 4)
      .map((cm) => cm.chatId);
    // Вибираємо чати
    const myChats = chats.filter((c) => myChatIds.includes(c.id));
    setChatList(myChats);
  }, []);

  // Завантажуємо повідомлення для вибраного чату
  useEffect(() => {
    if (selectedChatId !== null) {
      // Всі повідомлення цього чату
      const msgs = messages
        .filter((msg) => msg.chatId === selectedChatId)
        .map((msg) => ({
          ...msg,
          senderName: msg.sender.user.username,
        }));
      setChatMessages(msgs);
    }
  }, [selectedChatId]);

  // Прокрутка до останнього повідомлення
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // Надсилання повідомлення (оновлює тільки локально)
  const sendMessage = () => {
    if (messageInput.trim() === "" || selectedChatId === null) return;

    // Знаходимо ChatMember для поточного користувача в цьому чаті
    const sender = chatMembers.find(
      (cm) => cm.user.id === 4 && cm.chatId === selectedChatId
    );
    if (!sender) {
      alert("Ви не є учасником цього чату");
      return;
    }

    // Створюємо нове повідомлення
    const newMsg = {
      id: messages.length + 1,
      sender: sender,
      chatId: selectedChatId,
      sentAt: new Date(),
      text: messageInput,
      senderName: sender.user.username,
    };
    messages.push(newMsg); // Додаємо в mockDataBase (тільки для сесії)

    setMessageInput("");
    // Оновлюємо список повідомлень
    setChatMessages((prev) => [...prev, newMsg]);
  };

  return (
    <>
      <MyHeader />
      <div className="chat-page">
        <div className="chat-list">
          <h2>Чати</h2>
          <ul>
            {chatList.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                style={{
                  fontWeight: selectedChatId === chat.id ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                {chat.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="chat-window">
          {selectedChatId ? (
            <>
              <h2>Повідомлення</h2>
              <div className="message-list" style={{ height: 300, overflowY: "auto" }}>
                {chatMessages.map((msg) => (
                  <div key={msg.id}>
                    <b>{msg.senderName}:</b> {msg.text}
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
      <MyFooter />
    </>
  );
}