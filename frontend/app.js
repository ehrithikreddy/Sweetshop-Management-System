const express = require("express");
const cors = require("cors");
const db = require("./db");
const { registerUser, loginUser, authenticateToken } = require("./auth");

const app = express();
app.use(cors());
app.use(express.json());

// Register user
app.post("/register", registerUser);

// Login user
app.post("/login", loginUser);

// Get all sweets
app.get("/sweets", async (req, res) => {
  try {
    const sweets = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM sweets", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sweets" });
  }
});

// Add a new sweet
app.post("/sweets", authenticateToken, async (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || !price || quantity == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)",
        [name, category, price, quantity],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
    res.json({ message: "Sweet added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding sweet" });
  }
});

// Purchase a sweet (reduce stock)
app.post("/purchase/:id", authenticateToken, async (req, res) => {
  const sweetId = req.params.id;

  try {
    const sweet = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM sweets WHERE id = ?", [sweetId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Sweet is out of stock" });
    }

    await new Promise((resolve, reject) => {
      db.run(
        "UPDATE sweets SET quantity = quantity - 1 WHERE id = ?",
        [sweetId],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    res.json({ message: "Sweet purchased successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error purchasing sweet" });
  }
});

module.exports = app;
