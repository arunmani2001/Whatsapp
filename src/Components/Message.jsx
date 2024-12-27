import React from 'react';

const Message = ({ message }) => {
  return (
    <div className={`message ${message.isSentByUser ? 'sent' : 'received'}`}>
      {message.text}
    </div>
  );
};

export default Message;
