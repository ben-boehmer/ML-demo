pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        sh 'echo "Tests werden hier ausgeführt..."'
      }
    }
    stage('Build Backend') {
      steps {
        sh 'docker build -t ml-demo-backend ./backend'
      }
    }
    stage('Build Frontend') {
      steps {
        sh 'docker build -t ml-demo-frontend ./frontend'
      }
    }
  }
}
