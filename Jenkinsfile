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
                        sh 'npx playwright test api-tests'
                    }
                }
                
                stage('Integration Tests') {
                    agent {
                        docker {
                            // 이전 빌드 에러를 방지하기 위해 1.57.0 버전 사용
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

        stage('e2e Tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                    reuseNode true
                }
            }
            environment {
                E2E_BASE_URL = 'https://spanish-cards.netlify.app'
            }
            steps {
                sh 'npx playwright test'
            }
            post {
                always {
                    // 79번 가이드: 테스트 결과 리포트 게시
                    junit '**/results.xml'
                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report'
                    ])
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