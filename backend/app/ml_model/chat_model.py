# app/ml_model/chat_model.py

import requests

#OLLAMA_URL = "http://localhost:11434/api/chat"

import os
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/chat")

# Benjamin-Daten beim Start laden
try:
    with open("app/ml_model/benjamin.txt", "r", encoding="utf-8") as f:
        benjamin_context = f.read()
except Exception as e:
    benjamin_context = ""
    print(f"Fehler beim Laden von benjamin.txt: {e}")

def respond(prompt: str) -> str:
    headers = {"Content-Type": "application/json"}
    full_prompt = (
        f"Nutze die folgenden Informationen über Benjamin Böhmer für deine Antwort:\n\n"
        f"{benjamin_context}\n\n"
        f"Frage: {prompt}"
    )
    payload = {
        "model": "llama3:latest",  # oder dein lokal geladenes Modell
        "stream": False,
        "messages": [
            {"role": "system", "content": """Du bist ein hilfreicher Assistent für die Human Resources Abteilung.
            "Antworte immer ausschließlich auf Deutsch, auch wenn du in einer anderen Sprache gefragt wirst.
             Sei höflich und nett und benutze auch gerne angebrachte Smileys."""},
            {"role": "user", "content": full_prompt}
        ]
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, headers=headers, timeout=60000)
        response.raise_for_status()
        data = response.json()
        return data["message"]["content"]
    except Exception as e:
        print(f"Ollama Fehler: {e}")
        return "Fehler beim Abrufen der Antwort vom Modell."
