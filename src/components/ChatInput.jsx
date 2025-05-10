// src/components/ChatInput.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

export default function ChatInput({ roomId }) {
  const [message, setMessage] = useState('');
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = () => {
    if (!isTyping) {
      socket.emit('typing', roomId);
      setIsTyping(true);
    }
  };

  const sendMessage = () => {
    socket.emit('send_message', {
      roomId,
      content: message
    });
    setMessage('');
    setIsTyping(false);
  };

  return (
    <div className="chat-input">
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
        }}
        onKeyUp={() => setIsTyping(false)}
      />
      <button onClick={sendMessage}>Send</button>
      
      {isTyping && <div className="typing-indicator">Typing...</div>}
    </div>
  );
}
