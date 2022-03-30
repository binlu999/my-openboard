import * as CDK from 'aws-cdk-lib';

interface AppConfigureation{
    appName:string,
    appDomain:string,
    appTagBill:string
}

class ConfigurationBuilder{
    buildAppConfig(app:CDK.App):AppConfigureation{
        const env=app.node.tryGetContext('config');
        if(!env)
            throw new Error("Context variable missing on CDK command")
        return 
    }
}