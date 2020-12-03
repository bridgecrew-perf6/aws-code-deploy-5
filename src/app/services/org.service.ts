import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class OrgService {
	constructor(private httpClient: HttpClient) {}

	public getDetailsLabel(language) {
		let url = environment.apiBase + 'v1.0/org/org-details/' + language;
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public getOrg() {
		let url = environment.apiBase + 'v1.0/org';
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public getComponents() {
		let url = environment.apiBase + 'v1.0/org/component-master';
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public getOrgdetails(id) {
		let url = environment.apiBase + 'v1.0/org/' + id;
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public saveOrg(payload) {
		let url = environment.apiBase + 'v1.0/org';
		return this.httpClient.post(url, payload).pipe(catchError(this.errorHandler));
	}
	public updateOrg(payload) {
		let url = environment.apiBase + 'v1.0/org';
		return this.httpClient.put(url, payload).pipe(catchError(this.errorHandler));
	}

	public activateDeactivateOrg(id, status) {
		let url = environment.apiBase + 'v1.0/org/' + id + '/' + status;
		return this.httpClient.patch(url, {}).pipe(catchError(this.errorHandler));
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
