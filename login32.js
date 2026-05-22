const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper to load users
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

// Helper to save users
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Create a new account
async function createAccount(username, password) {
    const users = loadUsers();
    if (users[username]) {
        throw new Error('Username already exists.');
    }
    const hashed = await bcrypt.hash(password, 10);
    users[username] = { password: hashed };
    saveUsers(users);
    return 'Account created successfully.';
}

// Login
async function login(username, password) {
    const users = loadUsers();
    if (!users[username]) {
        throw new Error('Invalid username or password.');
    }
    const match = await bcrypt.compare(password, users[username].password);
    if (!match) {
        throw new Error('Invalid username or password.');
    }
    return 'Login successful.';
}

// Example usage (uncomment to test):
// (async () => {
//     try {
//         console.log(await createAccount('testuser', 'password123'));
//         console.log(await login('testuser', 'password123'));
//     } catch (err) {
//         console.error(err.message);
//     }
// })();

module.exports = { createAccount, login };