const express = require("express");
const app = express();
const PORT = 3000;


app.use(express.json());

let users = [];
let idCounter = 1;


app.use((req, res, next) => {
  const currentTime = new Date().toLocaleString();
  console.log(`Request received at: ${currentTime}`);
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get("/", (req, res) => {
  res.json({
    message: "Server Running",
    time: new Date().toLocaleString(),
  });
});



app.get("/users", (req, res) => {
  res.json({
    message: "Users fetched successfully",
    data: users,
    time: new Date().toLocaleString(),
  });
});


app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.json({
      message: "User not found",
      time: new Date().toLocaleString(),
    });
  }

  res.json({
    message: "User fetched successfully",
    data: user,
    time: new Date().toLocaleString(),
  });
});


app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // Validation
  if (!name || !email) {
    return res.json({
      message: "Name and email are required",
      time: new Date().toLocaleString(),
    });
  }

  
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.json({
      message: "Email already exists",
      time: new Date().toLocaleString(),
    });
  }

  const newUser = {
    id: idCounter++,
    name,
    email,
  };

  users.push(newUser);

  res.json({
    message: "User added successfully",
    data: newUser,
    time: new Date().toLocaleString(),
  });
});


app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.json({
      message: "User not found",
      time: new Date().toLocaleString(),
    });
  }

  users.splice(index, 1);

  res.json({
    message: "User deleted successfully",
    time: new Date().toLocaleString(),
  });
});




app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "All fields required",
      time: new Date().toLocaleString(),
    });
  }

  
  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      message: "Login Success",
      time: new Date().toLocaleString(),
    });
  }

  res.json({
    message: "Invalid Credentials",
    time: new Date().toLocaleString(),
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
