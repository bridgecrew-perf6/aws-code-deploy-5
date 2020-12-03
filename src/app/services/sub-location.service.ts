import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubLocationService {

  constructor(private httpClient:HttpClient) { }

  public getSubLocations(locationId){
    let url = environment.apiBase + "v1.0/sub-location/" + locationId;
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  public getSubLocationDetails(id){
    let url = environment.apiBase + "v1.0/sub-location/details/" + id;
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  public saveSubLocation(subLocationRequestObj){
    let url = environment.apiBase+"v1.0/sub-location";
    return this.httpClient.post(url, subLocationRequestObj).pipe(catchError(this.errorHandler));
  }

  public updateSubLocation(subLocationRequestObj){
    let url = environment.apiBase+"v1.0/sub-location";
    return this.httpClient.put(url, subLocationRequestObj).pipe(catchError(this.errorHandler));
  }

  public deleteSubLocation(subLocationRequestObj): Observable<any>
  {
    let url = environment.apiBase+"v1.0/sub-location/" + subLocationRequestObj.id;
    return this.httpClient.patch(url,subLocationRequestObj).pipe(catchError(this.errorHandler));
  };

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