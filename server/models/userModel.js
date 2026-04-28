const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Ensure users.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

const User = {
  findAll: () => {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  },

  findByEmail: (email) => {
    const users = User.findAll();
    return users.find(u => u.email === email);
  },

  findById: (id) => {
    const users = User.findAll();
    return users.find(u => u.id === id);
  },

  findByProvider: (provider, providerId) => {
    const users = User.findAll();
    return users.find(u => u.provider === provider && u.providerId === providerId);
  },

  create: (userData) => {
    const users = User.findAll();
    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      ...userData
    };
    users.push(newUser);
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    return newUser;
  },

  update: (id, updates) => {
    const users = User.findAll();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
      fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
      return users[index];
    }
    return null;
  }
};

module.exports = User;
