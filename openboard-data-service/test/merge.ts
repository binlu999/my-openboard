import {InfoApi} from 'groupdocs-merger-cloud';

const appSid:string = "9603e3c7-f89b-43d4-9aa8-728f3cafb657";
const appKey:string = "e58013f1c2be67f8070752e43453e527";

const infoApi:InfoApi = InfoApi.fromKeys(appSid,appKey);

infoApi.getSupportedFileFormats()
.then((result)=>{
    console.log("Supported file formats:");
    result.formats.forEach((format)=>{
        console.log(format.fileFormat+ " ("+format.extension+")");
    });
})
.catch((error)=>{
    console.log("Error: "+error.message);
});
