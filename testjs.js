const mysql = require('mysql');

// Create a mock connection (replace with your test DB if needed)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

// Simulated user input (this could be from a form or query string)
let username = "admin";
let password = "' OR '1'='1"; // Injection payload for testing

// ❌ VULNERABLE: Directly concatenating user input into SQL query
let query = "SELECT * FROM users WHERE username = '" + username +
            "' AND password = '" + password + "'";

console.log("Executing query:", query);

connection.query(query, (err, results) => {
    if (err) {
        console.error("Database error:", err);
        return;
    }
    if (results.length > 0) {
        console.log("Login successful (vulnerable to SQL injection!)");
    } else {
        console.log("Login failed");
    }
    connection.end();
});