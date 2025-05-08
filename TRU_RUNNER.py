import os
import subprocess
import json
from datetime import datetime

# Load permissions
with open("tru_permissions.json", "r") as f:
    permissions = json.load(f)

LOG_PATH = permissions["log_path"]
os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)

def log_action(action, result):
    with open(LOG_PATH, "a") as log:
        log.write(f"[{datetime.now()}] ACTION: {action}\nRESULT: {result}\n\n")

def execute_action(command):
    if command.startswith("run "):
        real_cmd = command[4:]
        try:
            result = subprocess.run(real_cmd, shell=True, capture_output=True, text=True)
            log_action(real_cmd, result.stdout or result.stderr)
            print(result.stdout)
        except Exception as e:
            log_action(real_cmd, f"ERROR: {e}")
            print(f"ERROR: {e}")
    else:
        log_action(command, "Action format not recognized.")
        print("Command format not recognized. Use: run <your-command>")

while True:
    user_input = input(">> Enter TRU Build Command: ")
    if user_input.strip().lower() in ["exit", "quit"]:
        break
    execute_action(user_input.strip())
