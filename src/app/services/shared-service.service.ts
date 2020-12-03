import { Injectable,EventEmitter } from '@angular/core';
import { Observable, Observer, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private globalSpinnerStateEmitter = new EventEmitter<boolean>();
  public pageLHSSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public user:any ={};
  constructor() { }

  getGlobalSpinnerStateEmitter(): EventEmitter<boolean> {
    return this.globalSpinnerStateEmitter;
  }

  changeGlobalSpinnerState(opened: boolean) {
    this.globalSpinnerStateEmitter.emit(opened);
  }

  public setUser(usr:any)
  {
    var userObj = JSON.parse(usr);
    this.user = userObj;
    console.log(this.user);
  }

  public hasPermission(key:String)
  {
    if(this.user.usrSuperAdmin)
      return true;
    console.log(this.user);
    if(this.user.permissions.indexOf(key) > -1)
    {
      return true;
    }
    else
      return false;

  }
  
  public setLHSCollapse(flag: boolean) {
    this.pageLHSSubject.next(flag);
  }
}
