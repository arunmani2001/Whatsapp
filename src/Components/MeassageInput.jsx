import React, { useState } from 'react';
import { useInstantDB } from './UseDatabase';

const MessageInput = ({ contactId }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useInstantDB();

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(contactId, message);
      setMessage('');
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;