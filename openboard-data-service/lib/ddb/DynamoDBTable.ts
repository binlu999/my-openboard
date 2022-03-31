import { Stack } from "aws-cdk-lib"
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export interface DDBTableProps{
    tableName:string,
    primaryKey:string,
    createLambdaPath?:string,
    updateLambdaPath?:string,
    readLambdaPath?:string,
    deleteLambdaPath?:string,
    secondaryIndexes?:string
}

export class DynamoDBTable{
    private stack:Stack;
    private props:DDBTableProps;
    private table:Table;

    private createLambda:NodejsFunction|undefined;
    private readLambda:NodejsFunction|undefined;
    private updaeLambda:NodejsFunction|undefined;
    private deleteLambda:NodejsFunction|undefined;
    
    

}