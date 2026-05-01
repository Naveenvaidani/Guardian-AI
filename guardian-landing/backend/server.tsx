const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// analyze API (mock AI)
app.post("/analyze", (req, res) => {
  const { text } = req.body;

  let risk = "Low";
  let category = "Safe";
  let explanation = "No issues detected";

  if (text && (text.includes("free") || text.includes("buy now"))) {
    risk = "High";
    category = "Spam";
    explanation = "Contains promotional keywords";
  }

  if (text && (text.includes("hate") || text.includes("abuse"))) {
    risk = "Medium";
    category = "Abuse";
    explanation = "Contains harmful language";
  }

  res.json({ risk, category, explanation });
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});