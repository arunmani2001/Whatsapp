import React, { useContext, useEffect } from 'react';
import ContactContext from './ContactContext';

const ContactList = () => {
  const { state, dispatch } = useContext(ContactContext);

  useEffect(() => {
    // Fetch contacts and update context
    dispatch({ type: 'SET_CONTACTS', payload: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' },{ id: 3, name: 'Arunkumar' },
        { id: 4, name: 'Ashockumar' },{ id: 4, name: 'Anandhan' }
    ] });
  }, [dispatch]);

  const handleContactClick = (contact) => {
    dispatch({ type: 'SELECT_CONTACT', payload: contact });
  };

  return (
    <div className="contact-list">
      {state.contacts.map((contact) => (
        <div key={contact.id} onClick={() => handleContactClick(contact)} className="contact-item">
          {contact.name}
        </div>
      ))}
    </div>
  );
};

export default ContactList;