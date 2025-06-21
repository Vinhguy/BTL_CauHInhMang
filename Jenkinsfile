pipeline {
    agent any
    tools {
        nodejs "NodeJS" // Tên cấu hình Node.js trong Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Vinhguy/BTL_CauHInhMang.git', credentialsId: 'github-ssh-key', branch: 'main'
            }
        }
        stage('Verify') {
            steps {
                bat 'dir' // Lists files in workspace
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
                // Nếu cần build, thêm lệnh: bat 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                // Tạo thư mục deploy nếu chưa tồn tại
                bat '''
                if not exist "C:\\deploy\\myapp" mkdir C:\\deploy\\myapp
                '''
                // Dừng server Node.js hiện tại (nếu đang chạy)
                bat '''
                taskkill /IM node.exe /F || exit 0
                '''
                // Dùng robocopy để chỉ sao chép các file có thay đổi, loại bỏ .git
                bat '''
                robocopy "%WORKSPACE%" "C:\\deploy\\myapp" /MIR /XD node_modules .git /LOG+:C:\\deploy\\robocopy.log & if %ERRORLEVEL% LEQ 1 exit 0
                '''
                // Cài lại dependencies trong thư mục deploy
                bat '''
                cd C:\\deploy\\myapp
                npm install
                '''
                // Chạy server Node.js
                bat '''
                cd C:\\deploy\\myapp
                start /B npm start
                '''
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