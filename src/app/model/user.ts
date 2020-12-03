import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Role } from './role';

export class User {
    public id: Number;
    public slNo: BigInteger;
    public  name: String;
    public  language: String;
    public  address: String;
    public  loginID: String;
    public  password: String;
    public  employeeNo: String;
    public  state: String;
    public  zipcode: BigInteger;
    public  city: String;
    public  alternatePhone: String;
    public  country: String;
    public  timezone: String;
    public  phone: String;
    public  profileurl: String;
    public  email: String;
    public  IMEINO: String;
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