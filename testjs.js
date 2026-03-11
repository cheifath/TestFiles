const mysql = require('mysql');
const util = require('util');

// Configuration (Mock)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
};

async function testVulnerableLogin() {
    const connection = mysql.createConnection(dbConfig);
    
    // Promisify the query method for modern async/await syntax
    const queryDb = util.promisify(connection.query).bind(connection);

    try {
        await new Promise((resolve, reject) => {
            connection.connect((err) => err ? reject(err) : resolve());
        });
        console.log("Connected to database.");

        // --- SIMULATED INPUT ---
        // The injection payload intended for the test
        const userInput = {
            username: "admin",
            password: "' OR '1'='1" 
        };

        // ---------------------------------------------------------
        // ⚠️ TEST CASE: VULNERABLE QUERY CONSTRUCTION
        // ---------------------------------------------------------
        // Directly concatenating input makes this vulnerable to SQLi
        const sql = "SELECT * FROM users WHERE username = '" + userInput.username + 
                    "' AND password = '" + userInput.password + "'";
        
        console.log(`\n[DEBUG] Executing SQL: ${sql}\n`);

        const results = await queryDb(sql);

        if (results.length > 0) {
            console.log("✅ Login successful (Bypassed authentication!)");
            console.log("User Data:", results[0]);
        } else {
            console.log("❌ Login failed");
        }

    } catch (err) {
        console.error("Application Error:", err.message);
    } finally {
        connection.end();
        console.log("Connection closed.");
    }
}

// Run the test
testVulnerableLogin();