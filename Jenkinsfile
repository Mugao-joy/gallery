pipeline {
    agent any
    
    tools{
        nodejs 'NodeJS'
    }
    stages {
        //1
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/Mugao-joy/gallery'
            }
        }
        //2
        stage('Install Dependencies') {
            steps {
                // Run npm install in the current workspace
                sh 'npm install'
            }
        }
        //3
        stage('Build and Deploy') {
            steps {
                // Deploy to Render by starting the server
                sh 'node server.js &'
            }
        }
    }
    post {
        success {
            echo 'Build, Test, and Deployment Successful!'
            
        }
        failure {
            echo 'Pipeline Failed!'
            mail to: 'mugao.dev@gmail.com',
                 subject: 'Pipeline Failed',
                 body: "The pipeline has failed. Please check the Jenkins console logs."
        }
    }
}