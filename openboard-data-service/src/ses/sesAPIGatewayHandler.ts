import { APIGatewayProxyEvent, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {SES} from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import {EmailMessage,EmailWrapper} from './emailWrapper'

async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const result:APIGatewayProxyResultV2={
        body:'Email sent successfully',
        statusCode:200

    };
    try {
        if(!event.body)
            throw new Error('Invalid request. No body found');

        const {from,to,subject,message} = JSON.parse(event.body) as EmailMessage;
        console.log('Going to send email');
        const result= await sendEmail({from,to,subject,message});
        console.log('Sent email',result);
        return result;
    } catch (error: unknown) {
        console.log("Error is:", error);
        if (error instanceof Error) {
            result.body=JSON.stringify(
                {
                    error: error.message
                },
            );
            result.statusCode=400;
            return result;
        }
        result.body=JSON.stringify(
            {
                error: error
            },
        );
        result.statusCode=400;
        return result;
    }

}

async function sendEmail(emailRequest:EmailMessage):Promise<APIGatewayProxyResultV2>{
    console.log("Received a request ",emailRequest);
    const result:APIGatewayProxyResultV2={
        body:JSON.stringify({message:'Email sent successfully'}),
        statusCode:200

    }
    const ses=new SES({region:'us-east-1'});
    const request=new EmailWrapper(emailRequest);
    await ses.sendEmail(request.getEmailParameters()).promise();
    return result;
}

export {handler,sendEmail}