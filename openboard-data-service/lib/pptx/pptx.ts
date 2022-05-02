import { Duration, Stack , RemovalPolicy } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import {RetentionDays} from 'aws-cdk-lib/aws-logs';
import { Bucket,StorageClass } from "aws-cdk-lib/aws-s3";

import { join } from 'path';

const PPTXModule:string='pptx';

interface PPTXProperties{
    s3BucketName:String,
    lambdaName:String,
    jarFile:String,
    handler:String,
    timeoutInSeconds:number,
    memorySize:number,
    environments:{
        [Key:string]:string
    }
}

class PPTX {
    private stack:Stack;
     private props:PPTXProperties;
     private bucket:Bucket;
     public lambdaFuction: Function;
     public pptxHandlerLambdaIntegration:LambdaIntegration;

     public constructor(stack:Stack,props:PPTXProperties){
          this.stack=stack;
          this.props=props;
          this.initialize();
     }

     private initialize(){
          this.initiateBucket();
          this.props.environments["SRC_BUCKET"]=this.bucket.bucketName;
          this.props.environments["DEST_BUCKET"]=this.bucket.bucketName;
          this.createLambda();
          this.createLambdaIntegration();
          this.grandPermission();
     }

     private initiateBucket(){
        this.bucket=new Bucket(this.stack,`${this.props.s3BucketName}`,{
            bucketName:`${this.props.s3BucketName}`,
            removalPolicy:RemovalPolicy.DESTROY,
            autoDeleteObjects:true,
            lifecycleRules:[
                {
                    transitions:[
                        {
                            storageClass:StorageClass.INFREQUENT_ACCESS,
                            transitionAfter:Duration.days(30)
                        }
                    ]
                }
            ]
        });
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

     private grandPermission(){
         this.bucket.grantRead(this.lambdaFuction);
         this.bucket.grantPut(this.lambdaFuction);
     }
}

export {PPTXModule,PPTX,PPTXProperties}