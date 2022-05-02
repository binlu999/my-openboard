import * as CDK from 'aws-cdk-lib';
import { StringAttribute } from 'aws-cdk-lib/aws-cognito';

interface AppConfiguration {
    account:string,
    region:string,
    name:string,
    domainName: string,
    subDomain: string,
    billTag: string,
    appModules:string[]
}

class ConfigurationBuilder {
    buildAppConfig(app: CDK.App): AppConfiguration {
        const account = app.node.tryGetContext('account');
        const domainName = app.node.tryGetContext('domainName');
        const configName = app.node.tryGetContext('config');

        if (!account || !domainName || !configName)
            throw new Error("Context variable missing on CDK command. Pass in as `-c config=xxx -c domainName=xyz.com -c account=123456`");
        
        console.log(configName);
        const config = app.node.tryGetContext(configName);
        config["account"]=account;
        config['domainName']=domainName;
        console.log(config);
        return config;
    }
}

export {ConfigurationBuilder,AppConfiguration};