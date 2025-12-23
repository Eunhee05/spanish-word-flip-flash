pipeline {
    agent any

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine'                    
                }
            }
            steps {
                sh 'npm ci'
                // build 스크립트가 없으므로 주석 처리 유지
                // sh 'npm run build'
            }
        }

        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    agent {
                        docker {
                            image 'node:22-alpine'
                            reuseNode true
                        }
                    }
                    steps {
                        // Vitest 대신 Playwright를 이용한 API 테스트만 실행하도록 수정
                        sh 'npx playwright test api-tests'
                    }
                }
                
                stage('Integration Tests') {
                    agent {
                        docker {
                            // 버전을 1.57.0으로 업데이트
                            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                            reuseNode true
                        }
                    }
                    steps {
                        sh 'npx playwright test tests'
                    }
                }
            }            
        }

        stage('Deploy') {
            steps {
                echo 'Mock deployment was successful!'                
            }
        }
    }
}