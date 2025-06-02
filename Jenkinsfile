pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'git@github.com:Vinhguy/BTL_CauHInhMang.git', credentialsId: 'github-ssh-key', branch: 'main'
            }
        }
        stage('Verify') {
            steps {
                bat 'dir' // Lists files in workspace
            }
        }
    }
}
