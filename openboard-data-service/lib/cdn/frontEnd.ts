import { join } from 'path';
import { Stack, CfnOutput, RemovalPolicy, Duration } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket, StorageClass } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source} from 'aws-cdk-lib/aws-s3-deployment';
import { AllowedMethods, CloudFrontWebDistribution, Distribution, OriginAccessIdentity, SecurityPolicyProtocol, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CanonicalUserPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';

const FRONTENDModule:string='frontend';

interface FrontEndProperties{
    domainName:string,
    subDomain:string,
    region:string
}
class FrontEnd{
    private stack:Stack;
    private props:FrontEndProperties;
    private siteDomain:String;
    private siteBucket:Bucket
    private cloudFrontOAI:OriginAccessIdentity;
    private distribution:Distribution;

    constructor(stack:Stack,props:FrontEndProperties){
        this.stack=stack;
        this.props=props;
        this.initialize();
        this.createContentBucket();
        this.createCloudFront();
        this.createBucketDeployment();
    }

    private initialize(){

        this.cloudFrontOAI=new OriginAccessIdentity(this.stack,'cloudfront-OAI',{
            comment:`OAI for ${this.props.domainName}`
        });

        this.siteDomain=this.props.subDomain+"."+this.props.domainName;

        new CfnOutput(this.stack,`${this.props.subDomain} Site-URL`,{
            value:'https://'+this.siteDomain
        });
    }

    private createContentBucket(){
        this.siteBucket=new Bucket(this.stack,`${this.siteDomain}`,{
            bucketName:`${this.siteDomain}`,
            publicReadAccess:false,
            blockPublicAccess:BlockPublicAccess.BLOCK_ALL,
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

        this.siteBucket.addToResourcePolicy(
            new PolicyStatement(
                {
                    actions:['s3:GetObject'],
                    resources:[this.siteBucket.arnForObjects("*")],
                    principals:[
                        new CanonicalUserPrincipal(this.cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)
                    ]
                }
            )
        );
        
        new CfnOutput(this.stack,`${this.siteDomain}`+'-forntend-bucket',{
            value:this.siteBucket.bucketName
        });
        
    }

    private createCloudFront(){
        const zone=HostedZone.fromLookup(this.stack, 'Zone',{
            domainName:this.props.domainName
        });
        
        const certificate = new DnsValidatedCertificate(this.stack,`${this.props.subDomain}-frontend-siteCertificate`,{
            domainName:`${this.siteDomain}`,
            hostedZone: zone,
            region:this.props.region
        })
        
        new CfnOutput(this.stack,`${this.props.subDomain}-certificate-arn`,{
            value:certificate.certificateArn
        });

        this.distribution=new Distribution(this.stack,this.props.subDomain+"-cloudfront_dist",{
            certificate:certificate,
            defaultRootObject:"index.html",
            domainNames:[`${this.siteDomain}`],
            
            minimumProtocolVersion:SecurityPolicyProtocol.TLS_V1_2_2021,
            errorResponses:[
                {
                    httpStatus:403,
                    responseHttpStatus:200,
                    responsePagePath:"/index.html",
                    ttl:Duration.minutes(30)
                },
                {
                    httpStatus:404,
                    responseHttpStatus:200,
                    responsePagePath:"/index.html",
                    ttl:Duration.minutes(30)
                }
            ],
            defaultBehavior:{
                origin:new S3Origin(this.siteBucket,{
                    originAccessIdentity:this.cloudFrontOAI
                }),
                compress:true,
                allowedMethods:AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                viewerProtocolPolicy:ViewerProtocolPolicy.REDIRECT_TO_HTTPS
            }

        });

        new CfnOutput(this.stack,this.props.subDomain+"CF-DistributionId",{
            value:this.distribution.distributionId
        })

        new ARecord(this.stack,this.props.subDomain+'site-alias-record',{
            recordName:`${this.siteDomain}`,
            target:RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
            zone
        })
        

    }

    private createBucketDeployment(){
        new BucketDeployment(this.stack,`${this.siteDomain}`+"-deployment",{
            sources:[
                Source.asset(
                    join(__dirname,'../../../openboard-frontend/',this.props.subDomain,'/dist/',this.props.subDomain)
                )
            ],
            destinationBucket:this.siteBucket,
            distribution:this.distribution,
            distributionPaths:['/*']
            
        });
    }
}

export {FRONTENDModule, FrontEnd, FrontEndProperties}