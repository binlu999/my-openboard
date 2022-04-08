import {SSMWrapper} from '../src/ssm/ssmWrapper';

const test = async ()=>{
    const ssmWrapper = new SSMWrapper()
    const asid = await ssmWrapper.getParameter('/openboard/clcc/docgroup-ppt/appSid');
    console.log(asid);
}

test();
