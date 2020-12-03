import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class DependentshowhideService {
	constructor(private httpClient: HttpClient) {}

	// Get Dependent Displays for an Org
	public getDependentDisplayForOrg(module){
		let url = environment.apiBase + 'v1.0/dependent-display/org/' + module;
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	// Get Dependent Displays for an Id
	public getDependentDisplay(id: number){
		let url = environment.apiBase + 'v1.0/dependent-display/' + id;
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	// Get customer labels
	public getCustomerLabels() {
		let url = environment.apiBase + 'v1.0/org-customer-custom-data/short';
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	// Save customer labels
	public saveCustomerLabels(payload) {
		let url = environment.apiBase + 'v1.0/dependent-display';
		return this.httpClient.post(url, payload).pipe(catchError(this.errorHandler));
	}

	// Update customer labels
	public updateCustomerLabels(payload) {
		let url = environment.apiBase + 'v1.0/dependent-display';
		return this.httpClient.put(url, payload).pipe(catchError(this.errorHandler));
	}

	errorHandler(errorObj: HttpErrorResponse) {
		//return Observable.throwError(error.message || "Server Error");
		if (errorObj.status) {
			alert(errorObj.error.errorMessage);
		} else {
			alert('Server Error');
		}
		return throwError(errorObj.error.message || 'Server Error');
	}
}
