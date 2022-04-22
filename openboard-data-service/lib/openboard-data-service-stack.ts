import { Fn, Stack, StackProps } from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { AppConfiguration } from './configurationBuilder'
import { DDBTableProps, DDBTable } from './ddb/DynamoDBTable';
//import { JavaLambdaHandler, JavaLambdaProperty } from './lambda/javaLambdaHandler';
import {PPTX,PPTXProperties} from './pptx/pptx'


// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class OpenboardDataServiceStack extends Stack {
  private appConfig: AppConfiguration;
  private restAPI: RestApi;
  private appSuffix:String;

  constructor(scope: Construct, id: string, appConfig: AppConfiguration, props?: StackProps) {
    super(scope, id, props);
    console.log(appConfig);
    this.appConfig = appConfig;
    this.initializeStack();
    // const queue = new sqs.Queue(this, 'OpenboardDataServiceQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

  }
  initializeStack() {
    this.initialAppSuffix();
    this.createAPIGateway();
    this.createDDBResources();
    this.createPPTX();
  }

  private initialAppSuffix(){
    console.log("stackId is "+this.stackId);
    const shortStackId= Fn.select(2,Fn.split('/',this.stackId));
    const suffix=Fn.select(4,Fn.split('-',shortStackId));
    console.log("shortStackId is "+shortStackId);
    console.log("Suffix is "+suffix);
    this.appSuffix=suffix;

  }

  private createAPIGateway() {
    this.restAPI = new RestApi(this, this.appConfig.appName + "-" + this.appConfig.appDomain + "-api");
  }

  createDDBResources() {
    const joborderTableProps: DDBTableProps = {
      tableName: this.appConfig.appDomain + '-joborder',
      source: 'joborder',
      primaryKey: 'id',
      createLambdaPath: 'create',
      secondaryIndexes: [
        'username'
      ]
    }

    const joborderTabl = new DDBTable(this, joborderTableProps);
    const restApiResouce = this.restAPI.root.addResource('joborder');
    restApiResouce.addMethod('POST', joborderTabl.createLambdaIntegration);
  }

  private createPPTX() {
    const pptXHandler = new PPTX(this, {
      s3BucketName:this.appConfig.appDomain + '-pptx',
      lambdaName: this.appConfig.appDomain + '-pptx-handler',
      jarFile: "pptservice-0.0.1-SNAPSHOT.jar",
      handler: "com.myopenboard.service.pptservice.handler.EventHandler::handleRequest",
      timeoutInSeconds: 180,
      memorySize:512,
      environments: {
        "SRC_BUCKET": "",
        "SRC_FOLDER": "pptx",
        "DEST_BUCKET":"",
        "DEST_FOLDER":"combined",
        "WORKING_DIR": "/tmp"
      }
    });

    const restApiResource = this.restAPI.root.addResource('pptx');
    restApiResource.addMethod('POST', pptXHandler.pptxHandlerLambdaIntegration)
  }
}
