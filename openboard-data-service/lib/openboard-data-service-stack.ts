import { Stack, StackProps } from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import {AppConfiguration} from './configurationBuilder'
import { DDBTableProps,DDBTable } from './ddb/DynamoDBTable';
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
    this.createDDBResources();
  }

  createDDBResources(){
    const joborderTableProps:DDBTableProps = {
      tableName:this.appConfig.appDomain+'-joborder',
      source:'joborder',
      primaryKey:'id',
      createLambdaPath:'create',
      secondaryIndexes:[
        'username'
      ]
    }

    const joborderTabl=new DDBTable(this,joborderTableProps);
    this.restAPI=new RestApi(this,this.appConfig.appName+"-"+this.appConfig.appDomain+"-api");
    const restApiResouce = this.restAPI.root.addResource('joborder');
    restApiResouce.addMethod('POST',joborderTabl.createLambdaIntegration);
  }
}
