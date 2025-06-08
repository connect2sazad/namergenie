from app import create_app
from dotenv import load_dotenv
import os

load_dotenv()

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv("AI_PORT", 5000))  # fallback to 5000 if not set
    app.run(debug=True, port=port)
