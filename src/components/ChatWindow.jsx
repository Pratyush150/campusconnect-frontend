// src/components/ChatWindow.jsx
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Box, TextInput, Button, ScrollArea, Group, Text } from '@mantine/core';
import { io } from 'socket.io-client';

export default function ChatWindow({ roomId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const socket = useRef(io(import.meta.env.VITE_CLIENT_URL));
  const scrollRef = useRef();

  useEffect(() => {
    socket.current.emit('join_room', roomId);
    
    socket.current.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.current.on('user_typing', (userId) => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });

    return () => {
      socket.current.off('receive_message');
      socket.current.off('user_typing');
    };
  }, [roomId]);

  const handleSend = () => {
    if (newMessage.trim()) {
      socket.current.emit('send_message', {
        roomId,
        content: newMessage,
        sender: currentUser.id
      });
      setNewMessage('');
    }
  };

  return (
    <Box style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollArea style={{ flex: 1 }} viewportRef={scrollRef}>
        {messages.map((msg) => (
          <Group key={msg.timestamp} mb="sm">
            <Text weight={600}>{msg.sender === currentUser.id ? 'You' : 'Mentor'}:</Text>
            <Text>{msg.content}</Text>
          </Group>
        ))}
        {isTyping && <Text color="dimmed">Mentor is typing...</Text>}
      </ScrollArea>
      
      <Group>
        <TextInput
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            socket.current.emit('typing', roomId);
          }}
          placeholder="Type a message..."
          style={{ flex: 1 }}
        />
        <Button onClick={handleSend}>Send</Button>
      </Group>
    </Box>
  );
}
