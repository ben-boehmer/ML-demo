=======
# ML-Demo 🚀

Ein kleines Fullstack-Demo-Projekt, das verschiedene moderne Techniken im Bereich Machine Learning und Webentwicklung kombiniert. Ziel ist es, ein interaktives Interface zur Verfügung zu stellen, das ML-Funktionalitäten demonstriert – inklusive Entscheidungsbaum, Bildklassifikation und Chatbot.

## ✨ Features

- 🧠 **Rentennähe-Vorhersage** mit einem Decision Tree (scikit-learn)
- 🐱🐶 **Bildklassifikation** (Hund oder Katze)
- 🤖 **Chatbot** basierend auf Ollama (lokales LLM)
- 🌐 **Frontend mit React + TailwindCSS**
- ⚙️ **FastAPI-Backend** mit strukturierter API
- 🐳 **Docker-ready** (optional)
- 🔐 CORS-Konfiguration und API-Schlüsselverwaltung
- 📁 Klare Trennung von Routen, Modellen und Logik

## 🗂️ Projektstruktur

```
ml-demo/
├── backend/
│   └── app/
│       ├── main.py
│       ├── routes/
│       │   ├── predict.py
│       │   ├── classify.py
│       │   └── chat.py
│       ├── ml_model/
│       │   ├── decision_tree_model.py
│       │   ├── image_classifier.py
│       │   └── chat_model.py
│       └── models.py
├── frontend/
│   └── src/
│       ├── components/ui/
│       │   ├── DecisionBox.tsx
│       │   ├── ClassifierBox.tsx
│       │   └── ChatbotBox.tsx
│       ├── MLFrontend.tsx
│       └── main.tsx
│   └── index.html
├── .env
├── requirements.txt
└── README.md
```

## 🚀 Startanleitung

### 1. Backend starten

```bash
cd backend/app
uvicorn main:app --reload
```

### 2. Frontend starten

```bash
cd frontend
npm install
npm run dev
```

### 3. Ollama Modell starten (für Chatbot)

```bash
ollama run llama3
```

Optional: Stelle sicher, dass deine `.env` korrekt ist und deine Modelle geladen wurden.

## 📦 Verwendete Technologien

- **Frontend:** React, TypeScript, TailwindCSS, Vite
- **Backend:** FastAPI, scikit-learn, Pillow, requests
- **LLM-Integration:** Ollama (lokales LLM via REST)
- **DevOps:** Docker (optional), Jenkins (optional)
- **Tooling:** Venv, .env, CORS, JSON-API

## 🔒 Hinweise

Die Chatbot-Komponente kann auch mit OpenAI oder OpenRouter betrieben werden. Aus Datenschutzgründen empfiehlt sich Ollama für lokale Szenarien. 
>>>>>>> c0fb17ce (ml-demo Version 1.0)
