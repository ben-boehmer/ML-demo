#!/bin/bash
set -e

echo "🚀 Starting Ollama server..."
ollama serve &    # Hintergrund starten
serve_pid=$!

# Warten bis Ollama erreichbar ist
for i in {1..10}; do
  if curl -sf http://localhost:11434; then
    echo "✅ Ollama läuft (Versuch $i)"
    break
  fi
  echo "⏳ Warte auf Ollama ($i)..."
  sleep 2
done

echo "📦 Pull Modell llama3 ..."
ollama pull llama3   # oder 'modelleintrag' ändern

# Server neu starten
kill $serve_pid
wait $serve_pid 2>/dev/null || true

echo "🎯 Modell gezogen, starte Ollama im Vordergrund"
exec /bin/ollama serve
