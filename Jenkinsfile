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
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        //4
        stage('Build and Deploy') {
            steps {
                // Deploy to Render by starting the server
                sh 'node server.js &'
            }
        }
        stage('Trigger Render Deploy') {
            steps {
                script {
                    // Trigger the Render deploy hook
                    def deployHookUrl = "https://api.render.com/deploy/srv-ct255rrtq21c73etsg90?key=LZsB3m5xlfg"
                    sh """
                    curl -X POST ${deployHookUrl}
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Build, Test, and Deployment on Render Successful!'
            sh """
            curl -X POST -H 'Content-type: application/json' \
            --data '{"text": "Build ID: ${env.BUILD_ID}, Deployed at: https://gallery-joy-ip1.onrender.com"}' \
            https://hooks.slack.com/services/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
            """
        }
        failure {
            echo 'Pipeline Failed!'
            mail to: 'mugao.dev@gmail.com',
                 subject: 'Pipeline Failed',
                 body: "The pipeline has failed. Please check the Jenkins console logs."
        }
    }
}