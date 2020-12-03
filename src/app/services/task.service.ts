import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(private httpClient:HttpClient) { }

  public getTasks(businessId)
  {
    let url = environment.apiBase + "v1.0/task/" + businessId;
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  public getTaskDetails(id){
    let url = environment.apiBase + "v1.0/task/details/" + id;
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }

  public saveTask(taskRequestObj){
    let url = environment.apiBase+"v1.0/task";
    return this.httpClient.post(url, taskRequestObj).pipe(catchError(this.errorHandler));
  }

  public updateTask(taskRequestObj){
    let url = environment.apiBase+"v1.0/task";
    return this.httpClient.put(url, taskRequestObj).pipe(catchError(this.errorHandler));
  }

  public updateNextTask(taskRequestObj){
    let url = environment.apiBase+"v1.0/task/next-task";
    return this.httpClient.patch(url, taskRequestObj).pipe(catchError(this.errorHandler));
  }

  public deleteTask(taskRequestObj): Observable<any>
  {
    let url = environment.apiBase+"v1.0/task/" + taskRequestObj.id;
    return this.httpClient.patch(url,taskRequestObj).pipe(catchError(this.errorHandler));
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
