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
      .filter((cm) => cm.user.id === 3)
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
      (cm) => cm.user.id === 3 && cm.chatId === selectedChatId
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

  const getLastMessagePreview = (chatId) => {
    const chatMsgs = messages
      .filter((msg) => msg.chatId === chatId)
      .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
  
    if (chatMsgs.length === 0) return "Немає повідомлень";
  
    const lastMsg = chatMsgs[0];
    const isCurrentUser = lastMsg.sender.user.id === 3;
    const senderName = isCurrentUser ? "Ви" : lastMsg.sender.user.username;
  
    if (chatList.find((chat) => chat.id === chatId)?.isGroup) {
      return `${senderName}: ${lastMsg.text}`;
    } else {
      return isCurrentUser ? `Ви: ${lastMsg.text}` : lastMsg.text;
    }
  };
  const getChatDisplayInfo = (chat) => {
    if (chat.isGroup) {
      return {
        name: chat.name,
        image: chat.imagePath,
      };
    }
  
    // Приватний чат: знаходимо іншого користувача
    const members = chatMembers.filter((cm) => cm.chatId === chat.id);
    const otherUser = members.find((m) => m.user.id !== 3)?.user;
  
    return {
      name: otherUser?.username ?? "Невідомий користувач",
      image: otherUser?.imagePath ?? "default-avatar.png",
    };
  };

  

  return (
    <>
      <MyHeader />
      <div className="chat-page">
        <div className="chat-list">
          <h2>Чати</h2>
          <ul>
          {chatList.length === 0 ? (
  <li className="chat-item">У вас немає чатів</li>
) : (
  chatList.map((chat) => {
    const { name, image } = getChatDisplayInfo(chat);
    return (
      <li
        key={chat.id}
        onClick={() => setSelectedChatId(chat.id)}
        className={`chat-item ${chat.id === selectedChatId ? "selected-chat" : ""}`}
      >
        <img src={image} alt={name} />
        <div>
          <strong>{name}</strong>
          <p>{getLastMessagePreview(chat.id)}</p>
        </div>
      </li>
    );
  })
)}
          </ul>
        </div>

        <div className="chat-window">
          {selectedChatId ? (
            <>
              <h2>Повідомлення</h2>
              <div className="message-list" >
                {chatMessages.map((msg) => {
    
    const isMyMessage = msg.sender.user.id === 3; // поточний юзер id = 4
    const time = msg.sentAt.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return (
      <div key={msg.id} className={`message-wrapper ${isMyMessage ? "my-message-wrap" : "other-message-wrap"}`}>
        <img
          src={msg.sender.user.imagePath}
          alt={msg.senderName}
          className="avatar"
          
        />
        <div className={`message ${isMyMessage ? "my-message" : "other-message"}`}>
          <div style={{ fontWeight: 600 }}>{msg.senderName}</div>
          <div>{msg.text}</div>
          <div style={{
  fontSize: 12,
  color: isMyMessage ? "#ddd" : "#777", // приклад: сірий або чорний
  textAlign: isMyMessage ? "left" : "right"
}} className="time-msg">{time}</div>
        </div>
      </div>
    );
  })}
  <div ref={messagesEndRef} />
</div>

<div className="send" style={{ display: "flex", gap: 10, marginTop: 10 }}>
  <input
    type="text"
    value={messageInput}
    onChange={(e) => setMessageInput(e.target.value)}
    placeholder="Введіть повідомлення..."
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
      backgroundColor: "white",
      color: "#333"
    }}
    onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
  />
  <button
    onClick={sendMessage}
    style={{
      padding: "10px 20px",
      backgroundColor: "#0a9ea2",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer"
    }}
  >
    Надіслати
  </button>
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