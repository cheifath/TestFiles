import psycopg2

class DatabaseManager:
    def __init__(self):
        self.host = "localhost"
        self.user = "admin"
        self.password = "SuperSecret123"
        self.db = "production_db"

    def connect(self):
        connection = psycopg2.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.db
        )
        return connection
    
    