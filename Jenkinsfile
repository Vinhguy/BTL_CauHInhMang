pipeline {
    agent any
    tools {
        nodejs "NodeJS"
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Vinhguy/BTL_CauHInhMang.git', credentialsId: 'github-ssh-key', branch: 'main'
            }
        }
        stage('Verify') {
            steps {
                bat 'dir'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
            }
        }
        stage('Deploy') {
            steps {
                // Tạo thư mục deploy
                bat '''
                if not exist "C:\\deploy\\myapp" mkdir C:\\deploy\\myapp
                '''
                // Sao chép file
                bat '''
                robocopy "%WORKSPACE%" "C:\\deploy\\myapp" /MIR /XD node_modules .git /LOG+:C:\\deploy\\robocopy.log & if %ERRORLEVEL% LEQ 1 exit 0
                '''
                // Cài dependencies
                bat '''
                cd C:\\deploy\\myapp
                npm install
                '''
                // Không cần taskkill, giả sử nodemon đã chạy
                echo 'Deployed files, nodemon will auto-reload if running.'
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed!'
        }
        failure {
            echo 'Pipeline failed! Check C:\\deploy\\robocopy.log for details.'
        }
    }
}