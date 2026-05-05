const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log('Request received at: ' + new Date().toISOString());
  console.log(req.method + ' ' + req.originalUrl);
  next();
});

let users = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.json({
    message: 'Server Running',
    time: new Date().toISOString()
  });
});

app.get('/users', (req, res) => {
  res.json({
    message: 'All users',
    time: new Date().toISOString(),
    users
  });
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(400).json({
      message: 'Name and email are required',
      time: new Date().toISOString()
    });
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return res.status(409).json({
        message: 'Duplicate email not allowed',
        time: new Date().toISOString()
      });
    }
  }

  const user = {
    id: nextId++,
    name,
    email
  };

  users.push(user);

  res.status(201).json({
    message: 'User added',
    time: new Date().toISOString(),
    user: user
  });
});

app.get('/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  let user = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      user = users[i];
      break;
    }
  }

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
      time: new Date().toISOString()
    });
  }

  res.json({
    message: 'User found',
    time: new Date().toISOString(),
    user
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  let userIndex = -1;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      userIndex = i;
      break;
    }
  }

  if (userIndex === -1) {
    return res.status(404).json({
      message: 'User not found',
      time: new Date().toISOString()
    });
  }

  users.splice(userIndex, 1);

  res.json({
    message: 'User deleted',
    time: new Date().toISOString()
  });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      message: 'All fields required',
      time: new Date().toISOString()
    });
  }

  if (email === 'admin@gmail.com' && password === '1234') {
    return res.json({
      message: 'Login Success',
      time: new Date().toISOString()
    });
  }

  res.status(401).json({
    message: 'Invalid Credentials',
    time: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
