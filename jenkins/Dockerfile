# jenkins/Dockerfile

FROM jenkins/jenkins:lts

USER root

# Python installieren
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv\
    nodejs npm \
    curl git && \
    apt-get clean

# Optional: Docker CLI hinzufügen, wenn Jenkins Docker benutzen soll
RUN curl -fsSL https://get.docker.com | sh

EXPOSE 8000 8080 5173

USER jenkins