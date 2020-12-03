import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketcustomconfigService {

  constructor(private httpClient: HttpClient) {}

  public getTicketCustomAttributes(bpId) {
		let url = environment.apiBase + 'v1.0/org-ticket-custom-data/bp/'+bpId;
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public getTicketCustomAttribute(id) {
		let url = environment.apiBase + 'v1.0/org-ticket-custom-data/' + id;
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public updateTicketCustomAttribute(payload) {
		let url = environment.apiBase + 'v1.0/org-ticket-custom-data';
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
