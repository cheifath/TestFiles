// INSECURE EXAMPLE - DO NOT USE IN PRODUCTION
const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.urlencoded({ extended: true }));

// ... database connection setup ...

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // VULNERABILITY: Using template literals to inject variables directly into SQL
    const query = `SELECT id FROM users WHERE email = '${email}' AND password = '${password}'`;

    db.query(query, (err, results) => {
        if (err) throw err;
        
        if (results.length > 0) {
            res.send("Welcome to your dashboard!");
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});