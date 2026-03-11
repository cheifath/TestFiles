import subprocess

def validate_access(has_perm, is_active, feature_on, space_ok, net_up, consented):
    # ❌ SMELL: Deeply nested conditions
    if has_perm:
        if is_active:
            if feature_on:
                if space_ok:
                    if net_up:
                        if consented:
                            print("Access granted.")

def list_dir(target_dir):
    # ❌ VULNERABLE: OS Command Injection
    subprocess.call(f"ls {target_dir}", shell=True)

# --- SIMULATED EXECUTION ---
validate_access(True, True, True, True, True, True)
list_dir("-la . && echo '⚠️ INJECTION SUCCESSFUL ⚠️'")