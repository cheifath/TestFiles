import sqlite3

def get_user(name):
    conn = sqlite3.connect("db.sqlite")
    cursor = conn.cursor()

    query = f"SELECT * FROM users WHERE name = '{name}'"

    cursor.execute(query)

    return cursor.fetchall()