//change these variables for your project
// def projectName ="CAT-PARTS-UI"
// def bucket = 'cat-parts.accenturejumpstart.com'
// def apiEndpoint = 'null'
// def targetEnv = 'dev'
// def branchname = env.BRANCH_NAME
// def pipelineView ="http://adop.accenturejumpstart.com/jenkins/job/AccentureJumpStart/job/CAT-PARTS/job/CAT-PARTS-UI/view/change-requests/job/$branchname/"
// // should not need to change any of the below
// def gzip =true
// def promote =false
// def testReportFileName = env.BUILD_TAG + '-report.html'
// def retireReportFileName = env.BUILD_TAG + '-retire.html'
// def functionalFailure =false
// def retireFailure =false
// // Change the Slack Notify Variables for your project
// def inSourceProj = 'catparts-ui'
// def linkInSource ="https://github.com/AccentureJumpStart/$inSourceProj/pull/$env.CHANGE_ID/"
// def linkSonar ="http://adop.accenturejumpstart.com/sonar/overview?id=$inSourceProj"
// def baseReport ="http://report.accenturejumpstart.com"
// def linkFunctional ="$baseReport/$testReportFileName"
// def linkRetire ="$baseReport/$retireReportFileName"
// def deploymentUrl ="http://$bucket/$env.CHANGE_ID/index.html"

// def s3Upload(Boolean gzip, String bucket, String sourceFile){
//     step([
//                         $class: 'S3BucketPublisher',
//                         consoleLogLevel: 'INFO',
//                         dontWaitForConcurrentBuildCompletion: true,
//                         entries: [
//             [
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
//             ]
//         ],
//                             pluginFailureResultConstraint: 'FAILURE',
//                             profileName: 'AccentureJumpStart',
//                             userMetadata: []
//     ])
// }
// // allows us to notify multiple slack channels of activity
// def multiSlack(String color, String message){
//     def teamChannel = 'cat-search-ui'
//     def notifyChannel = 'cat-search-ui-notify'
//     slackSend color: color, message: message, channel: notifyChannel
//     slackSend color: color, message: message, channel: teamChannel
// }
// void buildFunctionalReport(String testReportFileName, String BUILD_TAG, String BUILD_URL ){
//     def binding
//     sh"HTML=$testReportFileName BUILDTAG=$BUILD_TAG BUILDURL=$BUILD_URL npm run cucumber:report"
//     s3Upload(false, 'report.accenturejumpstart.com',
//     "features/report/*.html" )
// }


// node{
//     withEnv([
//         "PATH+NODE=${tool name: 'node6', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"
//     ]){

//         if (branchname =="master" || branchname =="dev"){
//             promote =true
//             deploymentUrl ="http://$bucket/index.html"
//             if (branchname =="master"){
//                 apiEndpoint = 'signet'
//                 bucket = 'cat-parts-prod.accenturejumpstart.com'
//                 targetEnv = 'production'
//             }
//         }

//     try{
//         stage('Check out Code, Prepare environment'){
//             parallel ("notify slack": {
//                     if (env.BUILD_NUMBER == '1' && env.BUILD_TAG.contains('PR-')){
//                         multiSlack('good',
//                         "<$linkInSource|New Pull request opened> on $projectName , building $branchname now. (<$pipelineView|view build in progress>)");
//                     } else if (env.BUILD_TAG.contains('PR-')){
//                         multiSlack('good',
//                         "<$linkInSource|$branchname updated> on $projectName , building $branchname now. (<$pipelineView|view build in progress>)")
//                     } else{
//                         multiSlack('good',
//                         "$branchname has been updated on $projectName, deploying to $targetEnv now. (<${env.BUILD_URL}|view build in progress>)")
//                     }
//                 },
//                 "getEnvironment": {
//                     echo sh(returnStdout: true, script: 'env')
//                 },
//                 "checkout code": {
//                     checkout scm
//                     if(!promote){
//                         sh"git merge origin/dev"
//                     }
//                 }

//             )
//             sh"npm install"
//             }

//         // stage('Style Checking & Unit Tests'){
//         //     parallel ("linting": {
//         //             sh"npm run lint"
//         //         },
//         //         "unit tests": {
//         //            sh"npm run coverage"
//         //         }
//         //     )
//         //     }
//         stage('Dependency Security Issue Check'){
//             parallel ("build app": {
//                 if (promote){
//                     sh"npm run build"
//                 } else{
//                     sh"npm run build"
//                 }
//             }
//             // "retire report": {
//             //     try {
//             //         sh "RETIRE_FILENAME=$retireReportFileName ./retire/retire.sh"
//             //         s3Upload(false, 'report.accenturejumpstart.com', "retire/$retireReportFileName")
//             //     } catch (err) {
//             //         retireFailure = true;
//             //         s3Upload(false, 'report.accenturejumpstart.com', "retire/$retireReportFileName")
//             //         throw err
//             //     }
//             // }
//             )
//         }

//       if(promote){
//         stage('Deploy to AWS'){
//                 s3Upload(gzip, bucket, 'build/**/*' )
//                 }
//             }else{
//         stage('Deploy to AWS'){
//                 sh"mkdir -p ./deploy/$env.CHANGE_ID/"
//                 sh"cp -R ./build/* ./deploy/$env.CHANGE_ID/"
//                 s3Upload(gzip, bucket, 'deploy/**/*' )
//                 }
//             }
//             //  stage('Regression Testing & Sonar Analysis'){
//             // retry(2){
//             //     try{
//             //         parallel ("Sonar Coverage": {
//             //                 def sonarqubeScannerHome = tool name: 'Sonar28', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
//             //                 sh"${sonarqubeScannerHome}/bin/sonar-scanner -X -e -Dsonar.verbose=true"
//             //             }
//             //         )
//             //         parallel ("regression test customer": {
//             //                 try{
//             //                     sh"URL='$deploymentUrl'  APIURL='https://api.accenturejumpstart.com/$apiEndpoint' DEPLOYMENT='devops' npm run cucumber:customer"
//             //                 } catch (err){
//             //                     functionalFailure = true;
//             //                     throw err
//             //                 }
//             //             }
//             //         )
//             //         } finally{
//             //         buildFunctionalReport(testReportFileName, env.BUILD_TAG, env.BUILD_URL)
//             //         }
//             //     }
//             // }
//         stage('Cleanup'){
//             sh"rm -rf ./deploy"
//             }
//         stage('Notify Team'){
//             if(promote){

//                 multiSlack('good',
//                     "$branchname for $projectName deployed successfully. <http://$bucket/index.html|View $branchname Deployment>  |  <$linkSonar|View Unit Test Coverage> | <$linkFunctional|View Fuctional Coverage> | <$linkRetire|View Retire Report>")
//                 }
//       else{

//                 multiSlack('good',
//                     "<$env.CHANGE_URL|PR-$env.CHANGE_ID - $env.CHANGE_TITLE>  for $projectName passed the build. <$deploymentUrl|View $branchname Deployment> |  <$linkSonar|View Unit Test Coverage> | <$linkFunctional|View Fuctional Coverage> | <$linkRetire|View Retire Report>  ")
//                 }
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
//             // if (promote) {
//             //     stage('Deploy to AWS') {
//             //         s3Upload(gzip, bucket, 'dist/**/*' )
//             //         multiSlack('good',"$env.BRANCH_NAME for $projectName deployed to AWS successfully")
//             //     }
//             //     if(buildAzure){
//             //         stage('Build the app for Azure') {
//             //             sh "rm -rf ./dist && ng build -e=dev-azure"
//             //         }
//             //         stage('Deploy to Azure') {
//             //             // todo, this should actually deploy to azure
//             //             s3Upload(gzip, azureBucket, 'dist/**/*' )
//             //         }
//             //     }
//             // }
//         } catch (err){
//         if (promote){
//             multiSlack('danger',
//                 "$env.BRANCH_NAME is broken on $projectName! This needs to be resolved ASAP!" )
//             } else if (retireFailure){
//             multiSlack('danger',
//                 "$env.BRANCH_NAME build failed on $projectName due to security test failure. <$linkRetire|View Security Coverage>")
//             } else if (functionalFailure){
//             multiSlack('danger',
//                 "$env.BRANCH_NAME build failed on $projectName due to functional test failure. <$linkFunctional|View Fuctional Coverage>")
//             } else{
//             multiSlack('danger',
//                 "$env.BRANCH_NAME build failed on $projectName, please fix before review.")
//             }
//         throw err
//         }
//         // finally{
//         //     s3Upload(gzip, 'report.accenturejumpstart.com',
//         //     "features/report/*.html" )
//         // }
//     }
// }
