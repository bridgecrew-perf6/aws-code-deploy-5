import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SkillService {

  constructor(private httpClient:HttpClient) { }

  getSkill()
    {
      let url = environment.apiBase+"v1.0/skill";
      return this.httpClient.get(url).pipe(catchError(this.errorHandler));
    }
  
  getSkillDetail(id)
  {
    let url = environment.apiBase+"v1.0/skill/"+id;
    return this.httpClient.get(url).pipe(catchError(this.errorHandler));
  }
  
  getParentSkill()
    {
      let url = environment.apiBase+"v1.0/skill/parent";
      return this.httpClient.get(url).pipe(catchError(this.errorHandler));
    }
  
  saveSkill(SkillObj): Observable<any>
    {
      let url = environment.apiBase+"v1.0/skill";
      return this.httpClient.post(url,SkillObj).pipe(catchError(this.errorHandler));
    };

  updateSkill(SkillObj): Observable<any>
    {
      let url = environment.apiBase+"v1.0/skill/"+SkillObj.id;
      return this.httpClient.put(url,SkillObj).pipe(catchError(this.errorHandler));
    };

  deleteSkill(SkillObj): Observable<any>
  {
    let url = environment.apiBase+"v1.0/skill/"+SkillObj.id;
    return this.httpClient.patch(url,SkillObj).pipe(catchError(this.errorHandler));
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
