require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Enable CORS so that your frontend (running on another port) can call this backend
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// Simple routes from before
app.get('/', (req, res) => {
  res.send('Welcome to Cohabit API');
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: { devices: true, automations: true },
  });
  res.json(users);
});

// New: POST /login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Fetch user from DB by email
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || user.password !== password) {
    // If no user found or password doesn't match, return an error
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // If credentials match, return a token
  // For now, we return a fake token. In production, you'd use a real JWT.
  const fakeToken = 'fake-jwt-token-123';
  res.json({ token: fakeToken });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Cohabit backend running on port ${PORT}`);
});
