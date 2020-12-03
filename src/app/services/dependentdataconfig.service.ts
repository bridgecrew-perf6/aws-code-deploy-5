import { Injectable, SkipSelf  } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DependentdataconfigService {

  constructor(private httpClient: HttpClient) { }

  public getAllCustomerDependentData() {
		let url = environment.apiBase + 'v1.0/dependent-data/customer';
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

  public saveCustomerDependentData(payload): Observable<any> {
		let url = environment.apiBase + 'v1.0/dependent-data/customer';
		return this.httpClient.post(url,payload).pipe(catchError(this.errorHandler));
  }

  public getCustomerDependentData(id):Observable<any> {
	let url = environment.apiBase + 'v1.0/dependent-data/customer/'+id;
	return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  public updateCustomerDependentData(payload): Observable<any> {
	let url = environment.apiBase + 'v1.0/dependent-data/customer';
	return this.httpClient.put(url,payload).pipe(catchError(this.errorHandler));
   }

   public getAllBPDependentData(type:string) {
	let url = environment.apiBase + 'v1.0/dependent-data/bp?type='+ type;
	return this.httpClient.get(url).pipe(catchError(this.errorHandler));
   }

   public saveBPDependentData(payload): Observable<any> {
	let url = environment.apiBase + 'v1.0/dependent-data/bp';
	return this.httpClient.post(url,payload).pipe(catchError(this.errorHandler));
   }

	public getBPDependentData(id):Observable<any> {
		let url = environment.apiBase + 'v1.0/dependent-data/bp/'+id;
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public updateBPDependentData(payload): Observable<any> {
		let url = environment.apiBase + 'v1.0/dependent-data/bp';
		return this.httpClient.put(url,payload).pipe(catchError(this.errorHandler));
     }

  errorHandler(errorObj: HttpErrorResponse) {
		if (errorObj.status) {
			alert(errorObj.error.errorMessage);
		} else {
			alert('Server Error');
		}
		return throwError(errorObj.error.message || 'Server Error');
	}
}
