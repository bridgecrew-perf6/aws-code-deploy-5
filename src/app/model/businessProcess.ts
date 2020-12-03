import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Role } from './role';

export class BusinessProcess {
    public id: Number;
    public slNo: BigInteger;
    public  name: String;
    public  status: String;
    public  description: String;
    public  part: Number;
    public  partLabel: String;
    public  displayOrder: Number;
    public  autoSchedule: boolean;
    public  locationMandatory: boolean;
    public  duration: Number;
    public  imageUrl: String;
    public  attachments: boolean;
    public  maxAttachments: Number;
    public  autoClose: boolean;
    public  autoCloseDays: Number;
    public  autoArchive: boolean;
    public  autoArchiveDay: Number;
    
    public  cellNo: String;
    public twoFA: boolean;
    public created: string;
    public edit:String;
    public joiningDate: Date; 
    public confirmDate: Date;
    public resgDate: Date;
    public twofasms: boolean;
    public twofaemail: boolean;
    public userRoles: Role[];
  }