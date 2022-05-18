import { Fn, Stack, StackProps } from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { AppConfiguration } from './configurationBuilder'
import { DynamoDBTableProperties, DynamoDBTable } from './ddb/DynamoDBTable';
import {PPTX, PPTXModule} from './pptx/pptx'
import {APIEmail, APIEMAILModule} from './apiemail/apiEmail'
import { FrontEnd, FRONTENDModule } from './cdn/frontEnd';
import { GroupEvent, GROUPEVENTModule } from './groupEvent/groupEvent';


// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class OpenboardDataServiceStack extends Stack {
  private appConfig: AppConfiguration;
  private restAPI: RestApi;
  private appSuffix:String;

  constructor(scope: Construct, id: string, appConfig: AppConfiguration, props?: StackProps) {
    super(scope, id, props);
    console.log(appConfig);
    console.log("Stack env:=================================");
    console.log("Stack env:",props);
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
    
    if( this.appConfig.appModules.includes(PPTXModule))
      this.createPPTX();

    if(this.appConfig.appModules.includes(APIEMAILModule))
      this.createAPIEmail();
    
    if(this.appConfig.appModules.includes(FRONTENDModule))
      this.createFrontEnd();

    if(this.appConfig.appModules.includes(GROUPEVENTModule))
      this.createGroupEvent();
      
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
    this.restAPI = new RestApi(this, this.appConfig.name + "-" + this.appConfig.subDomain + "-api");
  }

  createDDBResources() {
    const joborderTableProps: DynamoDBTableProperties = {
      tableName: this.appConfig.subDomain + '-joborder',
      primaryKey: 'id',
      createLambdaPath: 'create',
      secondaryIndexes: [
        'username'
      ]
    }

    const joborderTabl = new DynamoDBTable(this, joborderTableProps);
    const restApiResouce = this.restAPI.root.addResource('joborder');
    restApiResouce.addMethod('POST', joborderTabl.createLambdaIntegration);
  }

  private createPPTX() {
    const pptXHandler = new PPTX(this, {
      s3BucketName:this.appConfig.subDomain + '-pptx',
      lambdaName: this.appConfig.subDomain + '-pptx-handler',
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

  private createAPIEmail(){
    const apiEmail = new APIEmail(this,{
      name:this.appConfig.subDomain+'-apiemail'
    });
    const restApiResource = this.restAPI.root.addResource('apiemail');
    restApiResource.addMethod('POST',apiEmail.lambdaIntegration);
  }

  private createFrontEnd(){
    new FrontEnd(this,{
      domainName:this.appConfig.domainName,
      subDomain:this.appConfig.subDomain,
      region:this.appConfig.region
    });
  }

  private createGroupEvent(){
    new GroupEvent(this,this.restAPI,{
      subDomian:this.appConfig.subDomain
    })
  }
}
