import * as CDK from 'aws-cdk-lib';

interface AppConfigureation {
    appName: string,
    appDomain: string,
    appTagBill: string
}

export default class ConfigurationBuilder {
    buildAppConfig(app: CDK.App): AppConfigureation {
        const env = app.node.tryGetContext('config');
        if (!env)
            throw new Error("Context variable missing on CDK command. Pass in as `-c config=xxx`");

        const envParameters = app.node.tryGetContext(env);
        if (!env) {
            const errorMsg = `Environment parameters not defined for ${env}`;
            throw new Error(errorMsg);
        }
        return {
            appName: this.assertValue(envParameters,'appName'),
            appDomain: this.assertValue(envParameters,'appDomain'),
            appTagBill: this.assertValue(envParameters,'appTagBill')
        };
    }

    assertValue(parameters: Array<string>, propName: any): string {
        if(!parameters[propName]||parameters[propName].trim().length===0){
            throw new Error (propName+' does not exist or is empty');
        }
        return parameters[propName];
    }
}
