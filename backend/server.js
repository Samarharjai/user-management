const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Read data from JSON file
const getData = () => {
  const data = fs.readFileSync("./data.json", "utf-8");
  return JSON.parse(data);
};

// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = getData();

  // Check user credentials
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
