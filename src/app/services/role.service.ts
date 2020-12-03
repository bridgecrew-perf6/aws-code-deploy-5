import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient:HttpClient) { }

  getRole()
  {
    let url = environment.apiBase+"v1.0/role";
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  getParentRoles()
  {
    let url = environment.apiBase+"v1.0/role/parent";
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  getPermissions(roleId)
  {
    let url = environment.apiBase+"v1.0/role/permissions/"+ roleId;
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  saveRole(rolePayload): Observable<any>
  {
    let url = environment.apiBase+"v1.0/role";
    return this.httpClient.post(url,rolePayload).pipe(catchError(this.errorHandler));
  };

  getRoleAndPermissionDetails(id)
  {
    let url = environment.apiBase+"v1.0/role/"+ id;
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }


  updateRole(rolePayload): Observable<any>
  {
    let url = environment.apiBase+"v1.0/role";
    return this.httpClient.put(url,rolePayload).pipe(catchError(this.errorHandler));
  }

  deleteRole(rolePayload): Observable<any>
  {
    let url = environment.apiBase+"v1.0/role/"+rolePayload.id;
    return this.httpClient.patch(url,rolePayload).pipe(catchError(this.errorHandler));
  }

    //Handler to display error messages thrown from backend
    errorHandler(errorObj: HttpErrorResponse) {
      if (errorObj.status) {
        alert(errorObj.error.errorMessage);
      } else {
        alert('Server Error');
      }
      return throwError(errorObj.error.message || 'Server Error');
    }
  

}
