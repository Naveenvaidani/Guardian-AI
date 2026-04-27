/**
 * Simulated Database Service
 * In a real production app, this would be replaced by Supabase, Firebase, or a custom REST API.
 */

const STORAGE_KEY = 'guardian_db_mock';

const getDB = () => {
  const db = localStorage.getItem(STORAGE_KEY);
  return db ? JSON.parse(db) : { users: [], companies: [], logs: [] };
};

const saveDB = (db) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const db = {
  // User Operations
  users: {
    find: (email) => {
      const { users } = getDB();
      return users.find(u => u.email === email);
    },
    create: (userData) => {
      const database = getDB();
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        isTwoFactorEnabled: true, // Enabled by default for Guardian AI security
        ...userData
      };
      database.users.push(newUser);
      saveDB(database);
      return newUser;
    },
    update: (id, updates) => {
      const database = getDB();
      const index = database.users.findIndex(u => u.id === id);
      if (index !== -1) {
        database.users[index] = { ...database.users[index], ...updates };
        saveDB(database);
        return database.users[index];
      }
      return null;
    }
  },

  // Company Operations
  companies: {
    create: (companyData) => {
      const database = getDB();
      const newCompany = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        ...companyData
      };
      database.companies.push(newCompany);
      saveDB(database);
      return newCompany;
    }
  },

  // Logging for Audit
  logs: {
    add: (userId, action, metadata = {}) => {
      const database = getDB();
      database.logs.push({
        id: Math.random().toString(36).substr(2, 9),
        userId,
        action,
        metadata,
        timestamp: new Date().toISOString()
      });
      saveDB(database);
    }
  }
};
