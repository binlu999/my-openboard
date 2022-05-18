import { Stack } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { EventNotification } from "./eventNotification";

const GROUPEVENTModule:string='group-event';

interface GroupEventProperties{
    subDomian:string;
}

class GroupEvent{
    private stack:Stack
    private props:GroupEventProperties;
    private restApi:RestApi;
    
    constructor(stack:Stack, restApi:RestApi, props:GroupEventProperties){
        this.stack=stack;
        this.props=props;
        this.restApi=restApi;
        this.initialize();
    }

    private initialize(){
        this.createEventNotification();
    }

    private createEventNotification(){
        new EventNotification(this.stack,this.restApi,{
            subDomain:this.props.subDomian
        })
    }
}

export {GroupEvent,GroupEventProperties,GROUPEVENTModule};