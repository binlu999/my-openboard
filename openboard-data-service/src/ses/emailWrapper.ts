import { SendEmailRequest } from 'aws-sdk/clients/ses';

interface EmailMessage{
    from:string,
    to:string[],
    subject:string,
    message:String
}

class EmailWrapper{
    private email:EmailMessage;
    constructor(email:EmailMessage){
        this.email=email;
    }

    public getEmailParameters():SendEmailRequest{
        const request:SendEmailRequest={
            Destination: {
                ToAddresses:this.email.to
            },
            Message: {
                Body: {
                    Html:{
                        Charset:'UTF-8',
                        Data:this.getHTMLContent()
                    },
                    Text:{
                        Charset:'UTF-8',
                        Data:this.getTextContent()
                    }
                },
                Subject: {
                    Data: this.email.subject,
                }
            },
            Source: this.email.from
        };
        return request;
    }

    private getHTMLContent():string{
        return `
        <html>
            <body>
                <h1>Received an Email. 📬</h1>
                <h2>Sent from: </h2>
                <ul>
                    <li style="font-size:18px">👤 <b>${this.email.from}</b></li>
                </ul>
                <p style="font-size:18px">${this.email.message}</p>
            </body>
        </html> 
        `;
    }

    private getTextContent():string{
        return `
        Received an Email. 📬
        Sent from:
        👤 ${this.email.from}
        ✉️ ${this.email.from}
        Message Detail:
            ${this.email.message}
        `;
    }
}

export {EmailMessage,EmailWrapper}