export class Task {
    id: number;
    businessId:number;
    slNo:number;
    name:string;
    description:string;
    status:string;
    displayName:string;
    endStatus:boolean = false;
    integrationLabel:string;
    color:string;
    signature:boolean = false;
    removeSchedule:boolean = false;
    locationMandatory:boolean = false;
    punchin:boolean = false;
    attachmentMandatory:boolean = false;
    cameraAttachment:boolean = false;
    showPart:boolean = true;
    minAttachment:string;
    complaintStatus:boolean = true;
    geofence:boolean = false;
    geofenceRadius:string;
    geofenceType:string;
    otpGenerate:boolean = false;
    otpVerify:boolean = false;
    otpDestination:string;
    otpTemplate:string;
    nextTask:string;
}
