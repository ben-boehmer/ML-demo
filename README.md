=======
# ML-Demo 🚀

Ein kleines Fullstack-Demo-Projekt, das verschiedene moderne Techniken im Bereich Machine Learning und Webentwicklung kombiniert. Ziel ist es, ein interaktives Interface zur Verfügung zu stellen, das ML-Funktionalitäten demonstriert – inklusive Entscheidungsbaum, Bildklassifikation und Chatbot.

## ✨ Features

- 🧠 **Rentennähe-Vorhersage** mit einem Decision Tree (scikit-learn)
- 🐱🐶 **Bildklassifikation** (Hund oder Katze)
- 🤖 **Chatbot** basierend auf Ollama (lokales LLM)
- 🌐 **Frontend mit React + TailwindCSS**
- ⚙️ **FastAPI-Backend** mit strukturierter API
- 🐳 **Docker-ready** 
- 🔐 CORS-Konfiguration und API-Schlüsselverwaltung
- 📁 Klare Trennung von Routen, Modellen und Logik
- 🧪 **CI/CD-Integration** via Jenkinsfile 
- 📦 **Deployment per Ansible** 

## 📦 Verwendete Technologien

### 🎨 Frontend
- **React** mit **TypeScript**
- **TailwindCSS** für schlankes, flexibles Styling
- **Vite** als moderner Build- und Entwicklungsserver

### 🧠 Backend & Machine Learning
- **FastAPI** als schnelles, dokumentiertes REST-Framework
- **PyTest** für umfangreiche automatisierbare Tests
- **scikit-learn** für klassische ML-Modelle (z. B. Entscheidungsbaum)
- **Pillow** für Bildverarbeitung (z. B. Klassifikation Hund/Katze)
- **requests** für interne HTTP-Aufrufe
- **tensorflow2** für Klassifikation mit einem Convoluted Neural Network

### 🤖 LLM-Integration
- **Ollama** zur lokalen Ausführung eines LLM über REST-Schnittstelle (z. B. LLaMA)

### ⚙️ DevOps & Infrastruktur
- **Docker & Docker Compose** zur Containerisierung (optional, empfohlen)
- **Ansible** zur automatisierten Bereitstellung per Playbook
- **Jenkins** als CI/CD-Option (optional)
- **pyenv** zur Python-Versionierung (z. B. Python 3.10 gezielt einsetzbar)

### 🧰 Tooling & Projektstruktur
- **venv** für virtuelle Python-Umgebung
- **.env-Dateien** zur Trennung von Konfiguration und Code
- **CORS-Konfiguration** für sichere Browser-API-Kommunikation
- **OpenAPI/Swagger** automatisch generiert durch FastAPI
- **JSON-API** für strukturierte, verständliche Datenschnittstellen

Die Chatbot-Komponente kann auch mit OpenAI oder OpenRouter betrieben werden. Aus Datenschutzgründen empfiehlt sich Ollama für lokale Szenarien. 




## 🗂️ Projektstruktur

```
ml-demo
├── ansible
│   ├── deploy.yml
│   └── inventory.ini # 
├── backend
│   ├── app
│   │   ├── main.py
│   │   └── models.py
│   ├── tests
│   │   ├── test_chat.py
│   │   ├── test_classifiy.py
│   │   └── test_predict.py
│   ├── Dockerfile
│   └── requirements.txt
├── backend@tmp
├── frontend
│   ├── dist
│   ├── node_modules
│   ├── src
│   │   ├── components
│   │   ├── App_deaktiviert.tsx
│   │   ├── MLFrontend.tsx
│   │   ├── main.tsx
│   │   └── setupTests.ts
│   ├── Dockerfile
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vitest.config.ts
├── jenkins
│   └── Dockerfile
├── Jenkinsfile
├── Modelfile
├── README.md
└── docker-compose.yml
```

## 🚀 Startanleitung

Alles in jeweils einer eigenen Konsole:

### 1. Backend starten

```bash
cd backend/app
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Frontend starten

```bash
cd frontend
npm install
npm run dev
```

### 3. Ollama Modell starten (für Chatbot)

```bash
ollama serve
ollama run llama3
```
Anmerkung: Run llama3 kann sehr lange dauern, da ein ganzes LLM heruntergeladen
wird. Ca 7gb kann ich nicht im GitHub Repository speichern.
### 4 Alternative - Docker Compose:

```bash
cd ml-demo/
docker compose up --build -d
```
Achtung: Build des Image kann sehr lange dauern, da Ollama  ~7gb groß ist.
Es ist nicht best practise das Modell in das Image zu integrieren - aber ich
will eine Out-of-the-Box Lösung haben und dafür ging es sonst nicht anders.

Ansonsten sind auch die nötigen Jenkinsfile und in /ansible die deploy.yml
und inventory.ini zu finden.

>>>>>>> c0fb17ce (ml-demo Version 1.0)

