import React, { useContext, useEffect, useState } from 'react';
import ContactContext from './ContactContext';
import { useInstantDB, useIndexedDB } from './UseDatabase';
import Message from './Message';
import MessageInput from './MeassageInput';

const ChatWindow = () => {
    const { state, dispatch } = useContext(ContactContext);
    const { fetchMessages } = useInstantDB();
    const { saveOfflineData, getOfflineData } = useIndexedDB();
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      if (state.selectedContact) {
        fetchMessages(state.selectedContact.id)
          .then((fetchedMessages) => {
            const validMessages = fetchedMessages || [];
            setMessages(validMessages);
            dispatch({
              type: 'SET_MESSAGES',
              payload: { contactId: state.selectedContact.id, messages: validMessages },
            });
          })
          .catch((error) => {
            console.error('Error fetching messages:', error);
            setMessages([]);
          });
      }
    }, [state.selectedContact, fetchMessages, dispatch]);
  
    return (
      <div className="chat-window">
        <div className="chat-header">{state.selectedContact?.name || 'Select a Contact'}</div>
        <div className="chat-history">
          {(messages || []).map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
        </div>
        <MessageInput contactId={state.selectedContact?.id} />
      </div>
    );
  };
  
  export default ChatWindow;