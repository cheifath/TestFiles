// INSECURE EXAMPLE - DO NOT USE IN PRODUCTION
const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database(':memory:');

app.get('/user', (req, res) => {
    // 1. Get user input from the request URL (e.g., ?username=admin)
    const username = req.query.username;

    // 2. VULNERABILITY: Directly concatenating user input into the SQL command
    const query = "SELECT * FROM users WHERE username = '" + username + "'";

    // 3. Executing the query
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).send("Database error");
        } else {
            res.json(rows);
        }
    });
});