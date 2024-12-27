import { openDB } from 'idb';

const dbPromise = openDB('chat-app-db', 1, {
  upgrade(db) {
    db.createObjectStore('contacts', { keyPath: 'id' });
    db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
  },
});

export const useInstantDB = () => {
  const fetchMessages = async (contactId) => {
    try {
      const response = await fetch(`https://api.instantdb.com/messages/${contactId}`);
      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    }
  };

  const sendMessage = async (contactId, message) => {
    try {
      await fetch(`https://api.instantdb.com/messages/${contactId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return { fetchMessages, sendMessage };
};

export const useIndexedDB = () => {
  const saveOfflineData = async (storeName, data) => {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    await Promise.all(data.map((item) => tx.store.put(item)));
    await tx.done;
  };

  const getOfflineData = async (storeName) => {
    const db = await dbPromise;
    return await db.getAll(storeName);
  };

  return { saveOfflineData, getOfflineData };
};