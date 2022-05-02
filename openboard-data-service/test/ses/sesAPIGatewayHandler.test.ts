import { EmailMessage } from '../../src/ses/emailWrapper';
import { sendEmail} from '../../src/ses/sesAPIGatewayHandler';


const email:EmailMessage={
    from:"binlu99@gmail.com",
    to:["binlu99@gmail.com"],
    subject:'This is a test',
    message:"this is a test"
};
async function test(){
    const result= await sendEmail(email);
    console.log(result);
}


test();
