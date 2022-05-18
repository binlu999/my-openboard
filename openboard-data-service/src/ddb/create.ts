
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import {getEventBody} from '../utils/apiGatewayEvent';
import {generatorRandomId} from '../utils/randomIDGenerator';

const dbClient=new DynamoDB.DocumentClient();
const TABLE_NAME=process.env.TABLE_NAME;
const PRIMARY_KEY=process.env.PRIMARY_KEY;
const domain='this';

async function handler(event:APIGatewayProxyEvent,context:Context):Promise<APIGatewayProxyResult> {

    const result:APIGatewayProxyResult={
        statusCode:200,
        body:'Record created'
    };

    try{
        const item=getEventBody(event);
        item[PRIMARY_KEY!]=generatorRandomId();
        await dbClient.put(
            {
                TableName:TABLE_NAME!,
                Item:item
            }
        ).promise();
        
        result.body=JSON.stringify(
            {
                id:item[PRIMARY_KEY!]
            }
        )

    }catch(err:any){
        //if(err instanceof Missing)
        result.statusCode=500;
        result.body=err.message;
    }

    return result;
}

export {handler}