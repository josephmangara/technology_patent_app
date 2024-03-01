import secrets
import os

secret_key = secrets.token_hex(16)  # Generate a 32-character random hexadecimal string
print("Generated Secret Key:", secret_key)

# Write the secret key to a file
with open('.flask_secret_key', 'w') as f:
    f.write(secret_key)
