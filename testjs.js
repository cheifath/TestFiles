// INSECURE EXAMPLE - DO NOT USE IN PRODUCTION
const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.urlencoded({ extended: true }));

// ... database client setup ...

app.post('/update-bio', async (req, res) => {
    // ID comes securely from the user's logged-in session
    const userId = req.session.userId; 
    // The bio comes from the form submission
    const newBio = req.body.bio;       

    // VULNERABILITY: Concatenating user input into the SET clause
    const query = "UPDATE users SET bio = '" + newBio + "' WHERE id = " + userId;

    try {
        await client.query(query);
        res.send("Profile updated successfully!");
    } catch (err) {
        res.status(500).send("Database error");
    }
});