import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CustomercustomconfigService {
	constructor(private httpClient: HttpClient) {}

	public getCustomerCustomAttributes() {
		let url = environment.apiBase + 'v1.0/org-customer-custom-data';
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public getCustomerCustomAttribute(id) {
		let url = environment.apiBase + 'v1.0/org-customer-custom-data/' + id;
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public updateCustomerCustomAttribute(payload) {
		let url = environment.apiBase + 'v1.0/org-customer-custom-data/';
		return this.httpClient.put(url, payload).pipe(catchError(this.errorHandler));
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
