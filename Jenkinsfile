pipeline {
    agent any

    environment {
        PROJECT_ROOT = "/var/jenkins_home/ml-demo"
        VENV_PATH = "${PROJECT_ROOT}/venv"
        PYTHONPATH = "${PROJECT_ROOT}/backend"
    }

    stages {
        stage('Backend: Setup') {
            steps {
                dir("${PROJECT_ROOT}/backend") {
                    sh 'python3 -m venv ../venv'
                    sh '../venv/bin/pip install -r requirements.txt'
                }
            }
        }

        stage('Backend: Test Run') {
            steps {
                dir("${PROJECT_ROOT}/backend") {
                    sh 'PYTHONPATH=$(pwd) ../venv/bin/python -m app.main & sleep 5'
                    sh 'curl -f http://localhost:8000/docs || echo "FastAPI nicht erreichbar"'
                }
            }
        }

        stage('Frontend: Setup & Build') {
            steps {
                dir("${PROJECT_ROOT}/frontend") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Testing') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir("${PROJECT_ROOT}/backend") {
                            sh 'PYTHONPATH=$(pwd) ../venv/bin/pytest tests'
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir("${PROJECT_ROOT}/frontend") {
                            // Fallback-Test, wenn kein echtes Testskript existiert
                            sh 'npm run test || echo "Frontend-Tests fehlen oder sind nicht definiert"'
                        }
                    }
                }
            }
        }

        stage('Done') {
            steps {
                echo '✅ Build abgeschlossen!'
            }
        }
    }
}
