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
    stage('Build') {
      steps { 
        sh "rm -rf ./s3"
        sh "mkdir s3 ; ls ; pwd"
        sh "pwd"
        sh "ls"
        sh "docker build -t ui_image ."
        sh "echo 'IMAGE HAS BEEN BUILT'"
        sh "CONTAINER_ID=\"\$(docker run -t -d ui_image)\" ; docker cp \"\${CONTAINER_ID}:/app/build\" ./s3"
        sh "aws s3 sync ./s3/build s3://dev.santusha.com"
        sh "docker stop \$(docker ps -a -q) --force"
        sh "docker rmi \$(docker images -q) --force"
        sh "rm -rf ./s3"
        sendMessageToSlack('good', "AVA-UI: Branch #${prNumber} can be previewed <http://www.santusha.com/|here>");
      }
    }
  }

}

// //change these variables for your project
// def projectName = "ava-ui"
// def bucket = 'ava-contentment.s3.amazonaws.com'
// def apiEndpoint = 'ava-dev'
// def targetEnv = 'dev';
// def pipelineView = "http://ec2-34-228-73-99.compute-1.amazonaws.com"

// // should not need to change any of the below
// def gzip = true
// def promote = false
// def prNumber = env.BRANCH_NAME.drop(3)

// // Change the Slack Notify Variables for your project
// def repoName = 'ava-ui'
// def linkInSource = "https://github.com/zfranklyn/$repoName/pulls/$prNumber"

// def s3Upload(Boolean gzip, String bucket, String sourceFile){
//     step([
//                         $class: 'S3BucketPublisher', 
//                         consoleLogLevel: 'INFO', 
//                         dontWaitForConcurrentBuildCompletion: true, 
//                         entries: [
//                             [
//                                 bucket: bucket,
//                                 excludedFile: '', 
//                                 flatten: false, 
//                                 gzipFiles: gzip,
//                                 keepForever: false, 
//                                 managedArtifacts: false, 
//                                 noUploadOnFailure: true, 
//                                 selectedRegion: 'us-east-2', 
//                                 showDirectlyInBrowser: false, 
//                                 sourceFile: sourceFile, 
//                                 storageClass: 'REDUCED_REDUNDANCY', 
//                                 uploadFromSlave: false, 
//                                 useServerSideEncryption: false
//                                 ]
//                             ], 
//                             pluginFailureResultConstraint: 'FAILURE', 
//                             profileName: 'AccentureJumpStart', 
//                             userMetadata: []])
// }
// // allows us to notify multiple slack channels of activity
// def multiSlack(String color, String message) {
//     def notifyChannel = 'ava'
//     slackSend color: color, message: message, channel: notifyChannel 
// }

// if(env.BUILD_TAG.contains('PR-') || env.BRANCH_NAME == "master" || env.BRANCH_NAME == "dev"){
//     node {
//         withEnv(["PATH+NODE=${tool name: 'node6', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) { 
            
//             if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "dev") { 
//                 promote = true
//                 if (env.BRANCH_NAME == "master") {
//                     apiEndpoint = 'ava'
//                     bucket = 'ava-contentment.s3.amazonaws.com'
//                     targetEnv = 'production'
//                 }
//             }

//         try {
//             stage('Check out Code, Prepare environment') {
//                 parallel (
//                     "notify slack" : {
//                         if (env.BUILD_NUMBER == '1' && env.BUILD_TAG.contains('PR-')) {
//                             multiSlack('good', "<$linkInSource|New Pull request opened> on $projectName , building $env.BRANCH_NAME now. (<$pipelineView|view build in progress>)");
//                         } else if (env.BUILD_TAG.contains('PR-')) {
//                             multiSlack('good', "<$linkInSource|Pull request $env.BRANCH_NAME updated> on $projectName , building $env.BRANCH_NAME now. (<$pipelineView|view build in progress>)")
//                         } else {
//                             multiSlack('good',"$env.BRANCH_NAME has been updated on $projectName, deploying to $targetEnv now. (<${env.BUILD_URL}|view build in progress>)")
//                         } 
//                     },
//                     "checkout code" : {
//                         checkout scm
//                          if(!promote){
//                             sh "git merge origin/dev"
//                         }
//                     },
//                     // "reset data" : {
//                         // sh "curl https://api.accenturejumpstart.com/$apiEndpoint/resetdata" 
//                     // }
//                 )
//                 sh "npm install"
//             }
//             // stage('Style Checking & Unit Tests') {
//             //     parallel (
//             //         "build app" : {
//             //             if (env.BRANCH_NAME == "master") {
//             //                 sh "yarn build"
//             //             } else {
//             //                 sh "yarn build"
//             //             }
//             //         },
//             //         "linting" : {
//             //             sh "echo \"Running Linting\""
//             //         },
//             //         "unit tests" : {
//             //             sh "echo \"Running Unit Tests\""
//             //         }
//             //     ) 
//             // }
//             stage('Dependency Security Issue Check') {
//                 try {
//                     sh "RETIRE_FILENAME=$retireReportFileName ./retire/retire.sh"
//                     s3Upload(false, 'report.accenturejumpstart.com', "retire/$retireReportFileName")
//                 } catch (err) {
//                     retireFailure = true;
//                     s3Upload(false, 'report.accenturejumpstart.com', "retire/$retireReportFileName")
//                     throw err
//                 }
//             }   
//             stage('Deploy to test environment') {
//                 s3Upload(gzip, 'test.accenturejumpstart.com', "dist/**/*" )
//             }
//             // stage('Clear Test Data') {
//             //     parallel (
//             //         "reset data end" : {
//             //             sh "curl https://api.accenturejumpstart.com/$apiEndpoint/resetdata" 
//             //         }
//             //     )
//             //     if(!promote) {
//             //         multiSlack('good',"$env.BRANCH_NAME <$pipelineView|built successfully>. <$linkInSource| Review it here> | <$linkSonar|View Unit Test Coverage> | <$linkFunctional|View Fuctional Coverage> | <$linkRetire|View Retire Report>")
//             //     }
//             //     sh "echo View the report at http://report.accenturejumpstart.com/"  
//             // }
//             if (promote) {
//                 stage('Deploy to AWS') {
//                     s3Upload(gzip, bucket, 'dist/**/*' )
//                     multiSlack('good',"$env.BRANCH_NAME for $projectName deployed to AWS successfully")
//                 } 
//             } 
//         } catch (err) {
//             if (promote) {
//                 multiSlack('danger',"$env.BRANCH_NAME is broken on $projectName! This needs to be resolved ASAP!" )
//             } else if (retireFailure) {
//                 multiSlack('danger', "$env.BRANCH_NAME build failed on $projectName due to security test failure. <$linkRetire|View Security Coverage>")
//             } else if (functionalFailure) {
//                 multiSlack('danger', "$env.BRANCH_NAME build failed on $projectName due to functional test failure. <$linkFunctional|View Fuctional Coverage>")
//             } else {
//                 multiSlack('danger', "$env.BRANCH_NAME build failed on $projectName, please fix before review.")
//             }
//             throw err
//             }
//             finally {
//                 s3Upload(gzip, 'report.accenturejumpstart.com', "features/report/*.html" )
//             }
//         }
//     }
// } else {
//     node {
//         stage('Not building branch, please open PR'){
//             sh 'echo Not building branch, please open PR'
//         }
//     }
// }
