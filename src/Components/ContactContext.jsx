import React, { createContext, useReducer } from 'react';

const ContactContext = createContext();

const initialState = {
  contacts: [],
  messages: {},
  selectedContact: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: { ...state.messages, [action.payload.contactId]: action.payload.messages } };
    case 'SELECT_CONTACT':
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
}

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;