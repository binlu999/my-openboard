import { Stack } from "aws-cdk-lib"
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Handler } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from "path";

export interface DDBTableProps{
    tableName:string,
    source:string,
    primaryKey:string,
    createLambdaPath?:string,
    updateLambdaPath?:string,
    readLambdaPath?:string,
    deleteLambdaPath?:string,
    secondaryIndexes?:string[]
}

export class DDBTable{
    private stack:Stack;
    private props:DDBTableProps;
    private table:Table;

    private createLambda:NodejsFunction|undefined;
    private readLambda:NodejsFunction|undefined;
    private updaeLambda:NodejsFunction|undefined;
    private deleteLambda:NodejsFunction|undefined;

    public createLambdaIntegration:LambdaIntegration;
    public readLambdaIntegration:LambdaIntegration;
    public updateLambdaIntegration:LambdaIntegration;
    public deleteLambdaIntegration:LambdaIntegration;

    public constructor(stack:Stack,props:DDBTableProps){
        this.stack=stack;
        this.props=props;
        this.initialize();
    }   

    private initialize(){
        this.createTable();
        this.addSecondaryIndexs();
        this.createLambdas();
        this.grandTableRights();
    }

    private createTable(){
        this.table= new Table(this.stack,this.props.tableName,{
            partitionKey:{
                name:this.props.primaryKey,
                type:AttributeType.STRING
            },
            tableName:this.props.tableName
        });
    }

    private addSecondaryIndexs(){
        if(this.props.secondaryIndexes){
            for (const secondaryIndex of this.props.secondaryIndexes){
                this.table.addGlobalSecondaryIndex(
                    {
                        indexName:secondaryIndex,
                        partitionKey:{
                            name:secondaryIndex,
                            type:AttributeType.STRING
                        }
                    }
                )
            }
        }
    }
    
    private createLambdas(){
        if(this.props.createLambdaPath){
            this.createLambda=this.createSingleLambda(this.props.createLambdaPath);
            this.createLambdaIntegration=new LambdaIntegration(this.createLambda);
        }
    }

    private createSingleLambda(lambdaName:string):NodejsFunction{
        const lambdaId=`${this.props.tableName}-${lambdaName}`;
        return new NodejsFunction(this.stack,lambdaId,{
            entry:(join(__dirname,'..','..','src','ddb',this.props.source,`${lambdaName}.ts`)),
            handler:"handler",
            functionName:lambdaId,
            environment:{
                TABLE_NAME:this.props.tableName,
                PRIMARY_KEY:this.props.primaryKey
            }
        });
    }

    private grandTableRights(){
        if(this.createLambda){
            this.table.grantWriteData(this.createLambda);
        }

        if(this.updaeLambda){
            this.table.grantWriteData(this.updaeLambda);
        }

        if(this.readLambda){
            this.table.grantReadData(this.readLambda);
        }
        if(this.deleteLambda){
            this.table.grantWriteData(this.deleteLambda);
        }
    }
}