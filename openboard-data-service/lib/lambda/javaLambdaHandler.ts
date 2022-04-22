import { Duration, Stack } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import {RetentionDays} from 'aws-cdk-lib/aws-logs';
import { join } from 'path';

export interface JavaLambdaProperty{
     lambdaName:String,
     jarFile:String,
     handler:String,
     timeoutInSeconds:number,
     memorySize:number,
     environments:{}
}
export class JavaLambdaHandler{
     private stack:Stack;
     private props:JavaLambdaProperty;
     private lambdaFuction: Function;
     public pptxHandlerLambdaIntegration:LambdaIntegration;

     public constructor(stack:Stack,props:JavaLambdaProperty){
          this.stack=stack;
          this.props=props;
          this.initialize();
     }

     private initialize(){
          this.createLambda();
          this.createLambdaIntegration();
     }

     private createLambda(){
          this.lambdaFuction=new Function(this.stack,`${this.props.lambdaName}`,{
               runtime:Runtime.JAVA_11,
               code:Code.fromAsset(join(__dirname,'..','..','jar',`${this.props.jarFile}`)),
               
               handler:`${this.props.handler}`,
               functionName:`${this.props.lambdaName}`,
               logRetention:RetentionDays.THREE_DAYS,
               timeout:Duration.seconds(this.props.timeoutInSeconds),
               memorySize:this.props.memorySize,
               environment:this.props.environments
          });
     }

     private createLambdaIntegration(){
          this.pptxHandlerLambdaIntegration=new LambdaIntegration(this.lambdaFuction);
     }
     
}