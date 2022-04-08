import { CfnOutput } from 'aws-cdk-lib';
import { CfnIdentityPool, UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs'
import {AppConfiguration} from '../configurationBuilder';

export class IdentityPoolWrapper {

    private scope:Construct;
    private userPool:UserPool;
    private userPoolClient:UserPoolClient;
    private appConfig:AppConfiguration;

    private identityPool:CfnIdentityPool;

    constructor(scope:Construct, userPool:UserPool,userPoolClient:UserPoolClient,appConfig:AppConfiguration){
        this.scope=scope;
        this.userPool=userPool;
        this.userPoolClient=userPoolClient;
        this.appConfig=appConfig;
        
        this.initialize();
    }

    private initialize(){
        this.initializeIdentityPool();
    }
    private initializeIdentityPool(){
        this.identityPool = new CfnIdentityPool(this.scope,`${this.appConfig.appName}-${this.appConfig.appDomain}-identity-pool`,{
            allowUnauthenticatedIdentities:true,
            cognitoIdentityProviders:[{
                clientId:this.userPoolClient.userPoolClientId,
                providerName:this.userPool.userPoolProviderName
            }]
        });

        new CfnOutput(this.scope,`${this.appConfig.appName}-${this.appConfig.appDomain}-identity-pool-Id`,{
            value:this.identityPool.ref
        })
    }
}