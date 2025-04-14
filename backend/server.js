require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve static images
app.use("/uploads", express.static(uploadDir));

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sasikanth!@#@123", // Replace with your password
    database: "real_estate"
});

db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed: " + err.message);
    } else {
        console.log("✅ Connected to MySQL database");
    }
});

// Multer Storage for Image Uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (![".jpg", ".jpeg", ".png"].includes(ext)) {
            return cb(new Error("Only .jpg, .jpeg, .png files are allowed!"));
        }
        cb(null, Date.now() + ext);
    }
});
const upload = multer({ storage });

// *User Registration*
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: "✅ User registered successfully" });
        }
    );
});

// *User Login*
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "❌ User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ error: "❌ Invalid credentials" });

        res.json({
            message: "✅ Login successful",
            user: { id: user.id, username: user.username, email: user.email }
        });
    });
});

// *Upload Property Image*
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).send("❌ No image uploaded.");
    res.json({ filename: req.file.filename });
});

// *Fetch Properties by Location*
app.get("/properties", (req, res) => {
    const location = req.query.location || "";
    const sql = "SELECT * FROM properties WHERE location LIKE ?";

    db.query(sql, [`%${location}%`], (err, result) => {
        if (err) return res.status(500).send(err);

        result.forEach(property => {
            if (property.image) {
                property.image = `http://localhost:5000/uploads/${property.image}`;
            } else {
                property.image = "http://localhost:5000/uploads/default.jpg";
            }
        });

        res.json(result);
    });
});

// *Add New Property*
app.post("/properties", upload.single("image"), (req, res) => {
    const { title, location, type, status, price } = req.body;
    const imageName = req.file ? req.file.filename : null;

    db.query(
        "INSERT INTO properties (title, location, type, status, price, image) VALUES (?, ?, ?, ?, ?, ?)",
        [title, location, type, status, price, imageName],
        (err, result) => {
            if (err) return res.status(500).json({ error: "❌ Error adding property" });
            res.json({ message: "✅ Property added successfully", propertyId: result.insertId });
        }
    );
});

// *Mark Property as Sold*
app.put("/properties/:id/sell", (req, res) => {
    const { id } = req.params;

    db.query("UPDATE properties SET status = 'sold' WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: "❌ Error updating property" });
        res.json({ message: "✅ Property marked as sold" });
    });
});

// *Start Server*
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
