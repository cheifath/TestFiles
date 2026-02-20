// INSECURE EXAMPLE - DO NOT USE IN PRODUCTION
app.get('/products', (req, res) => {
    // User passes a column name, e.g., ?sort=price
    const sortBy = req.query.sort; 

    // VULNERABILITY: Injecting a column name directly into ORDER BY
    const query = `SELECT name, price FROM products ORDER BY ${sortBy} DESC`;

    db.all(query, (err, rows) => {
        res.json(rows);
    });
});