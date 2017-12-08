def projectName = "ava-ui"
def s3BucketURL = "ava-contentment.s3.amazonaws.com"
def jenkinsURL = "http://ec2-34-228-73-99.compute-1.amazonaws.com"
def prNumber = env.BRANCH_NAME
def githubURL = "https://github.com/zfranklyn/$projectName/pulls/$prNumber"
def slackChannel = "contentmentfoundation"

def sendMessageToSlack(String color, String message) {
    def notifyChannel = 'ava'
    slackSend(color: color, message: message, channel: notifyChannel)
}

def s3Upload(Boolean gzip, String bucket, String sourceFile){
    step([
                        $class: 'S3BucketPublisher', 
                        consoleLogLevel: 'INFO', 
                        dontWaitForConcurrentBuildCompletion: true, 
                        entries: [
                            [
                                bucket: bucket,
                                excludedFile: '', 
                                flatten: false, 
                                gzipFiles: gzip,
                                keepForever: false, 
                                managedArtifacts: false, 
                                noUploadOnFailure: true, 
                                selectedRegion: 'us-east-2', 
                                showDirectlyInBrowser: false, 
                                sourceFile: sourceFile, 
                              storageClass: 'REDUCED_REDUNDANCY', 
                                uploadFromSlave: false, 
                                useServerSideEncryption: false
                                ]
                            ], 
                            pluginFailureResultConstraint: 'FAILURE', 
                            profileName: 'AccentureJumpStart', 
                            userMetadata: []])
}

pipeline {
  agent any
  stages {
    stage('Initial Stage'){
      steps {
        sh "echo \"PR Number: ${prNumber}\""
        sh "echo \"github URL: ${githubURL}\""
        sendMessageToSlack('good', "AVA-UI: Build for Branch #${prNumber} intiated");
      }
    }
    stage('Build and Upload to S3') {
      steps { 
        sh "rm -rf ./s3"
        sh "mkdir s3 ; ls ; pwd"
        sh "pwd"
        sh "ls"
        sh "docker build -t ui_image ."
        sh "echo 'IMAGE HAS BEEN BUILT'"
        sh "CONTAINER_ID=\"\$(docker run -t -d ui_image)\" ; docker cp \"\${CONTAINER_ID}:/app/build\" ./s3"
        sh "aws s3 sync ./s3/build s3://dev.santusha.com"
        sh "docker stop \$(docker ps -a -q)"
        sh "docker rm \$(docker ps -a -q)"
        sh "docker rmi \$(docker images -q)"
        sh "rm -rf ./s3"
        sendMessageToSlack('good', "AVA-UI: Build for branch #${prNumber} suceeded! Preview available <http://dev.santusha.com/|here>");
      }
    }
  }

}

