import {SSM} from 'aws-sdk';

class SSMWrapper{
    private getParameterWorker = async (name:string, decrypt:boolean):Promise<string|undefined> =>{
        const ssm=new SSM();
        const result = await ssm.getParameter({
            Name:name,
            WithDecryption:decrypt
        }).promise();
        return result.Parameter?.Value;
    }

    public async getParameter(name:string):Promise<string|undefined>{
        return this.getParameterWorker(name,false);
    } 

    public async getEncrtptedParameter(name:string):Promise<string|undefined>{
        return this.getParameterWorker(name,true);
    }

}

export {SSMWrapper}

