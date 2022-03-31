import { Stack, StackProps } from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { SamlConsolePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import {AppConfiguration} from './configurationBuilder'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class OpenboardDataServiceStack extends Stack {
  private appConfig:AppConfiguration;
  private restAPI:RestApi;
  constructor(scope: Construct, id: string,appConfig:AppConfiguration, props?: StackProps) {
    super(scope, id, props);
    console.log(appConfig);
    this.appConfig=appConfig;
    this.initializeStack();
    // const queue = new sqs.Queue(this, 'OpenboardDataServiceQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

  }
  initializeStack(){
    this.restAPI=new RestApi(this,this.appConfig.appName+"-"+this.appConfig.appDomain+"-api");
  }
}
