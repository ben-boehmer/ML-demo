# Stage 1: Modell herunterladen
FROM ollama/ollama:latest AS downloader

# Starte den Ollama-Server, warte kurz, dann pull
RUN ollama serve & \
    sleep 5 && \
    ollama pull llama3

# Stage 2: Produktives Ollama-Image mit vorinstalliertem Modell
FROM ollama/ollama:latest

# Host und Port anpassen, falls notwendig
ENV OLLAMA_HOST="0.0.0.0"

# Modelldaten übernehmen
COPY --from=downloader /root/.ollama /root/.ollama

EXPOSE 11434
ENTRYPOINT ["ollama", "serve"]
