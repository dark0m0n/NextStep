import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/styles/chatsCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";
//import {chats, chatMembers, messages } from "../mockDataBase";



function formatDate(date) {
  const d = new Date(date);
  const today = new Date();

  if (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  ) {
    return "сьогодні";
  }
  return d.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function groupMessagesByDate(messages) {
  return messages.reduce((acc, msg) => {
    const dateKey = formatDate(msg.sentAt);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(msg);
    return acc;
  }, {});
}

export default function ChatPage() {
  const [chatList, setChatList] = useState([]);
  const [curUser, setCurUser] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);
  const [chatMembers, setChatMembers] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

   useEffect(() => {
    fetch("http://localhost:8000/api/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          return null;
        }
        if (!res.ok) throw new Error("Не вдалося завантажити профіль");
        return res.json();
      })
      .then((user) => {
        if (!user) return;
        setCurUser(user);
      })
      .catch((err) => console.error("Помилка завантаження:", err));
   }, []);
  
  
   useEffect(() => {
    if (!curUser || !userId) return;
    if (Number(userId) === curUser.id) return;
  
    const formData = new FormData();
    formData.append("isGroup", "false");
    formData.append("member1", curUser.id);
    formData.append("member2", Number(userId));
  
    fetch("http://localhost:8000/api/chat", {
      method: "POST",
      credentials: "include",
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error("Не вдалося створити чат");
        return res.json();
      })
      .then(newChat => {
        setChatList(prev => [...prev, newChat]);
        setSelectedChatId(newChat.id);
      })
      .catch(err => {
        console.error("Помилка створення чату", err);
        navigate("/chat");
      });
  }, [curUser, userId, navigate]);

  // Завантажуємо повідомлення для вибраного чату

  useEffect(() => {
    if (!selectedChatId) return;
  
    fetch(`http://localhost:8000/api/members/${selectedChatId}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setChatMembers(data))
      .catch(err => {
        setChatMembers([]);
        console.error("Не вдалося завантажити учасників чату:", err);
      });
  }, [selectedChatId]);

  useEffect(() => {
    if (!selectedChatId) return;
  
    fetch(`http://localhost:8000/api/messages/${selectedChatId}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(msg => ({
          ...msg,
          senderName: msg.sender.user.username,
        }));
        setChatMessages(formatted);
      })
      .catch(err => {
        setChatMessages([]);
        console.error("Не вдалося завантажити повідомлення:", err);
      });
  }, [selectedChatId]);

  // Прокрутка до останнього повідомлення
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

    // Створюємо нове повідомлення
    const sendMessage = () => {
      if (messageInput.trim() === "" || selectedChatId === null || !curUser) return;
    
      const sender = chatMembers.find(
        (cm) => cm.user.id === curUser.id && cm.chatId === selectedChatId
      );
    
      if (!sender) {
        alert("Ви не є учасником цього чату");
        return;
      }
    
      const formData = new FormData();
      formData.append("chatId", selectedChatId);
      formData.append("senderId", sender.id);
      formData.append("text", messageInput);
    
      fetch("http://localhost:8000/api/messages", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Помилка надсилання повідомлення");
          return res.json();
        })
        .then((newMsg) => {
          setChatMessages((prev) => [...prev, {
            ...newMsg,
            senderName: sender.user.username,
          }]);
          setMessageInput("");
        })
        .catch((err) => {
          console.error("Помилка надсилання повідомлення:", err);
        });
    };


    const getLastMessagePreview = (chatId) => {
      const chatMsgs = chatMessages
        .filter((msg) => msg.chatId === chatId)
        .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
    
      if (chatMsgs.length === 0) return "Немає повідомлень";
    
      const lastMsg = chatMsgs[0];
      const isCurrentUser = lastMsg.sender.user.id === curUser?.id;
      const senderName = isCurrentUser ? "Ви" : lastMsg.senderName;
    
      return chatList.find((chat) => chat.id === chatId)?.isGroup
        ? `${senderName}: ${lastMsg.text}`
        : (isCurrentUser ? `Ви: ${lastMsg.text}` : lastMsg.text);
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
    const otherUser = members.find((m) => m.user.id !== curUser.id)?.user;
  
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
  <li className="chat-item no-hover">У вас немає чатів</li>
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
              <div className="message-list">
                {Object.entries(groupMessagesByDate(chatMessages))
                  .sort(([dateA], [dateB]) => {
                    // "сьогодні" завжди остання
                    if (dateA === "сьогодні") return 1;
                    if (dateB === "сьогодні") return -1;
                    // Сортуємо дати як дати
                    const [dayA, monthA, yearA] = dateA.split('.').map(Number);
                    const [dayB, monthB, yearB] = dateB.split('.').map(Number);
                    const dA = new Date(yearA, monthA - 1, dayA);
                    const dB = new Date(yearB, monthB - 1, dayB);
                    return dA - dB;
                  })
                  .map(([date, msgs]) => (
    <React.Fragment key={date}>
      <div style={{
        textAlign: "center",
        margin: "15px 0 5px 0",
        color: "#888",
        fontWeight: 600,
        fontSize: 14
      }}>
        {date}
      </div>
      {msgs.map((msg) => {
        const isMyMessage = msg.sender.user.id === curUser?.id;
        const time = new Date(msg.sentAt).toLocaleTimeString("uk-UA", {
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
                color: isMyMessage ? "#ddd" : "#777",
                textAlign: isMyMessage ? "left" : "right"
              }} className="time-msg">{time}</div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  ))}
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