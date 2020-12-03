import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient:HttpClient) { }

  public getLocation()
  {
    let url = environment.apiBase + "v1.0/location";
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  public getLocationDetails(id){
    let url = environment.apiBase + "v1.0/location/" + id;
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  public getParentLocation(){
    let url = environment.apiBase+"v1.0/location/parent-location";
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));

  }

  public saveLocation(locationRequestObj){
    let url = environment.apiBase+"v1.0/location";
    return this.httpClient.post(url, locationRequestObj).pipe(catchError(this.errorHandler));

  }

  public updateLocation(locationRequestObj){
    let url = environment.apiBase+"v1.0/location";
    return this.httpClient.put(url, locationRequestObj).pipe(catchError(this.errorHandler));
  }

  public deleteLocation(locationRequestObj): Observable<any>
  {
    let url = environment.apiBase+"v1.0/location/" + locationRequestObj.id;
    return this.httpClient.patch(url,locationRequestObj).pipe(catchError(this.errorHandler));
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