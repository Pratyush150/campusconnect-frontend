// src/components/ChatWindow.jsx
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export default function ChatWindow({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL, {
      auth: { token: localStorage.getItem('token') }
    });

    socketRef.current.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socketRef.current.on('user_typing', (userId) => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socketRef.current.emit('send_message', {
        roomId: 'general',
        text: newMessage
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.timestamp} className="message">
            <p>{msg.text}</p>
          </div>
        ))}
        {isTyping && <div className="typing-indicator">Someone is typing...</div>}
      </div>
      <div className="input-area">
        <input 
          value={newMessage}
          onChange={e => {
            setNewMessage(e.target.value);
            socketRef.current.emit('typing', 'general');
          }}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
