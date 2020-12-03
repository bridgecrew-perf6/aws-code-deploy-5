import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  getUserDetails()
  {
    let obj = {};
    
    let url = environment.apiBase+"v1.0/user";
    return this.httpClient.get(url);
  }

  createUser(user) {
    console.log('inside userservice user data'+user);
    let url = environment.apiBase+"v1.0/user";
     return this.httpClient.post(url, user);
  }

  public getUserdetailsById(id) {
    let url = environment.apiBase + 'v1.0/user/' + id;
    return this.httpClient.get(url);
  }

  public getOrgRoles()
  {
    let url = environment.apiBase+"v1.0/role/org-role";
    return this.httpClient.get(url);
  }
  public updateUser(payload){
    let url = environment.apiBase + 'v1.0/user/update/'+payload.id;
    console.log("Final url "+url); 
    return this.httpClient.put(url,payload);
    }

    //To get auto suggestion users for assign manager while create user
    public getManagersForUser(searchString: string): Observable<User[]>
    {
      let url = environment.apiBase+'v1.0/user/manager/'+searchString;
      return this.httpClient.get<User[]>(url);
    }

    //To get Already assigned roles for user
    public getExistinGuserRoles(userId: Number)
    {
      console.log('User Roles ------->'+userId);
      let url = environment.apiBase+'v1.0/user/role/'+userId;
      return this.httpClient.get(url);
    }


}
