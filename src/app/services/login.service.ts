import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  login(loginObj): Observable<any>
  {
    var obj = {
      "username":loginObj.username,
      "password":loginObj.password
    };

    let url = environment.apiBase+"authenticate";
    return this.httpClient.post(url,obj)
  };

  getDefaultUser(){
    let url = environment.apiBase + 'v1.0/user/current';
    return this.httpClient.get(url);
  }

}
