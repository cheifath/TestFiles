import os

def read_user_document(filename):
    # ❌ VULNERABLE: Path Traversal
    # Allows reading arbitrary files outside the intended directory
    base_dir = "/var/www/documents/"
    
    # If filename is "../../etc/passwd", it resolves outside base_dir
    file_path = os.path.join(base_dir, filename)
    
    with open(file_path, 'r') as file:
        return file.read()

# --- SIMULATED EXECUTION ---
# Bypasses the intended directory to read a sensitive system file
sensitive_data = read_user_document("../../../../../etc/passwd")
print(sensitive_data)