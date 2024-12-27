import React from 'react';
import { ContactProvider } from './Components/ContactContext';
import ContactList from './Components/ContactList';
import ChatWindow from './Components/ChatWindow';
import './App.css'

function App() {
  return (
    <ContactProvider>
      <div className="app-container">
        <ContactList />
        <ChatWindow />
      </div>
    </ContactProvider>
  );
}

export default App;