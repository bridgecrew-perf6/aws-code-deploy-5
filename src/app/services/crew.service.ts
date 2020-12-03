import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CrewService {
	constructor(private httpClient: HttpClient) {}

	getCrew() {
		let url = environment.apiBase + 'v1.0/crew';
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	getUserDetails() {
		let url = environment.apiBase + 'v1.0/user';
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	saveCrew(payload) {
		let url = environment.apiBase + 'v1.0/crew';
		return this.httpClient.post(url,payload).pipe(catchError(this.errorHandler));
	}

	getCrewDetails(id) {
		let url = environment.apiBase + 'v1.0/crew/'+id;
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	updateCrew(payload){
		let url = environment.apiBase + 'v1.0/crew';
		return this.httpClient.put(url,payload).pipe(catchError(this.errorHandler));

	}
	deleteCrew(payload){
     let url = environment.apiBase+"v1.0/crew/"+payload.id;
	 return this.httpClient.patch(url,payload).pipe(catchError(this.errorHandler));
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
