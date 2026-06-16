const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Example route (your pairing page)
app.get("/", (req, res) => {
  res.send("Bot is running. Pairing system goes here.");
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// 👉 Your bot logic below (WhatsApp, etc.)
