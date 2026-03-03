import sqlite3

def get_user_profile(username):
    # Connect to the database
    conn = sqlite3.connect('app_database.db')
    cursor = conn.cursor()
    
    # VULNERABLE: Dynamically building the SQL query using string formatting (f-strings)
    query = f"SELECT * FROM users WHERE username = '{username}'"
    
    # Executing the query
    cursor.execute(query)
    user_data = cursor.fetchall()
    
    conn.close()
    return user_data

    

