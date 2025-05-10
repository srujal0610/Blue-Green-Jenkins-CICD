pipeline {
    agent any

    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['blue', 'green'], description: 'Select Deployment Environment (Blue or Green)')
        booleanParam(name: 'SWITCH_TRAFFIC', defaultValue: false, description: 'Switch traffic to the selected environment')
    }

    environment {
        DOCKERHUB_REPO = "dhruv2412"
        KUBE_NAMESPACE = "webapps"
        INGRESS_BLUE = "k8s/ingress-blue.yaml"
        INGRESS_GREEN = "k8s/ingress-green.yaml"
    }

    stages {

        stage('Checkout Code') {
            steps {
                script {
                    echo "📥 Checking out code..."
                    git branch: 'main', credentialsId: 'blue-green', url: 'https://github.com/Dhruvlunagaria/Diamondlabour_linux'
                }
            }
        }

        stage('Deploy Blue or Green') {
            steps {
                script {
                    def deploymentFile = "k8s/${params.DEPLOY_ENV}-deployment.yaml"
                    def serviceFile = "k8s/${params.DEPLOY_ENV}-service.yaml"

                    echo "🚀 Deploying ${params.DEPLOY_ENV} environment..."
                    
                    if (fileExists(deploymentFile)) {
                        sh "kubectl apply -f ${deploymentFile} -n ${KUBE_NAMESPACE}"
                    } else {
                        error "❌ Deployment file ${deploymentFile} not found!"
                    }

                    if (fileExists(serviceFile)) {
                        sh "kubectl apply -f ${serviceFile} -n ${KUBE_NAMESPACE}"
                    } else {
                        error "❌ Service file ${serviceFile} not found!"
                    }
                }
            }
        }

        stage('Switch Traffic') {
            when {
                expression { return params.SWITCH_TRAFFIC }
            }
            steps {
                script {
                    echo "🔄 Checking current traffic route..."

                    def ACTIVE_SERVICE = sh(script: """
                        kubectl get ingress -n ${KUBE_NAMESPACE} -o=jsonpath='{.items[0].spec.rules[0].http.paths[0].backend.service.name}' || echo "unknown"
                    """, returnStdout: true).trim()

                    echo "✅ Currently active: ${ACTIVE_SERVICE}"

                    if (ACTIVE_SERVICE == "unknown") {
                        error "❌ Failed to retrieve active service from the ingress!"
                    }

                    // Determine which ingress file to apply
                    def NEW_INGRESS = (ACTIVE_SERVICE == "green-service") ? INGRESS_BLUE : INGRESS_GREEN

                    echo "🗑️ Deleting existing ingress..."
                    sh "kubectl delete ingress -n ${KUBE_NAMESPACE} --all --ignore-not-found=true"

                    echo "🚀 Applying new ingress: ${NEW_INGRESS}..."
                    sh "kubectl apply -f ${NEW_INGRESS} -n ${KUBE_NAMESPACE}"

                    echo "✅ Traffic successfully switched!"
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "🔍 Verifying deployment..."
                    sh """
                        kubectl get pods -n ${KUBE_NAMESPACE}
                        kubectl get svc -n ${KUBE_NAMESPACE}
                        kubectl get ingress -n ${KUBE_NAMESPACE} -o yaml
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Blue-Green Deployment Successful!"
        }
        failure {
            echo "❌ Deployment failed. Check logs and debug."
        }
    }
}













// pipeline {
//     agent any

//     parameters {
//         choice(name: 'DEPLOY_ENV', choices: ['blue', 'green'], description: 'Select Deployment Environment (Blue or Green)')
//         booleanParam(name: 'SWITCH_TRAFFIC', defaultValue: false, description: 'Switch traffic to the selected environment')
//     }

//     environment {
//         DOCKERHUB_REPO = "dhruv2412"
//         KUBE_NAMESPACE = "webapps"
//         INGRESS_BLUE = "k8s/ingress-blue.yaml"
//         INGRESS_GREEN = "k8s/ingress-green.yaml"
//     }

//     stages {

//         stage('Checkout Code') {
//             steps {
//                 script {
//                     echo "📥 Checking out code..."
//                     git branch: 'main', credentialsId: 'blue-green', url: 'https://github.com/Dhruvlunagaria/Diamondlabour_linux'
//                 }
//             }
//         }

//         stage('SonarQube Scan') {
//             steps {
//                 script {
//                     echo "🔍 Running SonarQube scan..."
//                     sh """
//                         sonar-scanner \
//                           -Dsonar.projectKey=blue_green_sonar \
//                           -Dsonar.sources=. \
//                           -Dsonar.host.url=http://localhost:9000 \
//                           -Dsonar.token=sqp_68da0ac216eaf86acc4891ad6101d3f559272a62
//                     """
//                 }
//             }
//         }

//         stage('Deploy Blue or Green') {
//             steps {
//                 script {
//                     def deploymentFile = "k8s/${params.DEPLOY_ENV}-deployment.yaml"
//                     def serviceFile = "k8s/${params.DEPLOY_ENV}-service.yaml"

//                     echo "🚀 Deploying ${params.DEPLOY_ENV} environment..."

//                     if (fileExists(deploymentFile)) {
//                         sh "kubectl apply -f ${deploymentFile} -n ${KUBE_NAMESPACE}"
//                     } else {
//                         error "❌ Deployment file ${deploymentFile} not found!"
//                     }

//                     if (fileExists(serviceFile)) {
//                         sh "kubectl apply -f ${serviceFile} -n ${KUBE_NAMESPACE}"
//                     } else {
//                         error "❌ Service file ${serviceFile} not found!"
//                     }
//                 }
//             }
//         }

//         stage('Switch Traffic') {
//             when {
//                 expression { return params.SWITCH_TRAFFIC }
//             }
//             steps {
//                 script {
//                     echo "🔄 Checking current traffic route..."

//                     def ACTIVE_SERVICE = sh(script: """
//                         kubectl get ingress -n ${KUBE_NAMESPACE} -o=jsonpath='{.items[0].spec.rules[0].http.paths[0].backend.service.name}' || echo "unknown"
//                     """, returnStdout: true).trim()

//                     echo "✅ Currently active: ${ACTIVE_SERVICE}"

//                     if (ACTIVE_SERVICE == "unknown") {
//                         error "❌ Failed to retrieve active service from the ingress!"
//                     }

//                     def NEW_INGRESS = (ACTIVE_SERVICE == "green-service") ? INGRESS_BLUE : INGRESS_GREEN

//                     echo "🗑️ Deleting existing ingress..."
//                     sh "kubectl delete ingress -n ${KUBE_NAMESPACE} --all --ignore-not-found=true"

//                     echo "🚀 Applying new ingress: ${NEW_INGRESS}..."
//                     sh "kubectl apply -f ${NEW_INGRESS} -n ${KUBE_NAMESPACE}"

//                     echo "✅ Traffic successfully switched!"
//                 }
//             }
//         }

//         stage('Verify Deployment') {
//             steps {
//                 script {
//                     echo "🔍 Verifying deployment..."
//                     sh """
//                         kubectl get pods -n ${KUBE_NAMESPACE}
//                         kubectl get svc -n ${KUBE_NAMESPACE}
//                         kubectl get ingress -n ${KUBE_NAMESPACE} -o yaml
//                     """
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             echo "✅ Blue-Green Deployment Successful!"
//         }
//         failure {
//             echo "❌ Deployment failed. Check logs and debug."
//         }
//     }
// }














