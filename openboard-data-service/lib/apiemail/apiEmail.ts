import { join } from 'path';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Stack } from 'aws-cdk-lib';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import {PolicyStatement,Effect} from 'aws-cdk-lib/aws-iam';

const APIEMAILModule:string='apiemail';

interface APIEmailProperties{
    name:String,

};

class APIEmail{
    private stack:Stack;
    private props:APIEmailProperties;
    public lambdaFunction:NodejsFunction;
    public lambdaIntegration:LambdaIntegration

    constructor(stack:Stack,props:APIEmailProperties){
        this.stack=stack;
        this.props=props;
        this.initialize();
    }

    private initialize(){
        this.createLambda();
        this.addRolePolicy();
        this.createIntegration();
    }

    private createLambda(){
        this.lambdaFunction=new NodejsFunction(this.stack,`${this.props.name}`,{
            functionName:`${this.props.name}`,
            entry:join(__dirname,'../../src/ses','sesAPIGatewayHandler.ts'),
            handler:'handler',
            logRetention:RetentionDays.THREE_DAYS,
            environment:{

            }
        })
    }

    private addRolePolicy(){
        this.lambdaFunction.addToRolePolicy(
            new PolicyStatement({
                effect:Effect.ALLOW,
                actions:[
                    'ses:SendEmail',
                    'ses:SendRawEmail',
                    'ses:SendTemplatedEmail'
                ],
                resources:[
                    `arn:aws:ses:us-east-1:${Stack.of(this.stack).account}:identity/*`
                ]
            })
        );
    }

    private createIntegration(){
        this.lambdaIntegration=new LambdaIntegration(this.lambdaFunction);
    }
}

export {APIEMAILModule, APIEmail,APIEmailProperties}
