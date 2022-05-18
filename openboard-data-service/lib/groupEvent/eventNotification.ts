import { Stack } from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { DynamoDBTable,DynamoDBTableProperties} from '../ddb/DynamoDBTable';
interface EventNotificationProperties{
    subDomain:string;
}

class EventNotification{
    private stack: Stack
    private props:EventNotificationProperties;
    private restApi:RestApi;
    private dynamoDBTable:DynamoDBTable;

    constructor(stack:Stack,restApi:RestApi,props:EventNotificationProperties){
        this.stack=stack;
        this.props=props;
        this.restApi=restApi;
        this.initialize();
        
    }

    private initialize(){
        this.createDynamoDB();
    }

    private createDynamoDB(){

          const notificationTable = new DynamoDBTable(this.stack, {
            tableName: this.props.subDomain + '-event-notification',
            primaryKey: 'id',
            createLambdaPath: 'create',
            secondaryIndexes: [
              'subject'
            ]
          });
          const restApiResouce = this.restApi.root.addResource('eventnotification');
          restApiResouce.addMethod('POST', notificationTable.createLambdaIntegration);

    }
}

export {EventNotificationProperties,EventNotification};