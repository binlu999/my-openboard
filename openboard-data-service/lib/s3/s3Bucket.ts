import { Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import {StorageClass} from 'aws-cdk-lib/aws-s3'

export interface BucketProperties{
    name:String
}
export class S3Bucket{
    private stack:Stack;
    private props:BucketProperties;
    public bucket:Bucket;

    public constructor(stack:Stack, props:BucketProperties){
        this.stack=stack;
        this.props=props;
    } 

    private initiateBucket(){
        this.bucket=new Bucket(this.stack,`${this.props.name}`,{
            bucketName:`${this.props.name}`,
            removalPolicy:RemovalPolicy.DESTROY,
            autoDeleteObjects:true,
            lifecycleRules:[
                {
                    transitions:[
                        {
                            storageClass:StorageClass.INFREQUENT_ACCESS,
                            transitionAfter:Duration.days(1)
                        }
                    ]
                }
            ]
        });
    }
}