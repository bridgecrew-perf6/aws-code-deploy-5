import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BusinessProcessService {

  constructor(private httpClient : HttpClient) { }

  createBusinessProcess(payload) {
    console.log('inside BusinessProcessService  data is'+payload);
    let url = environment.apiBase+"v1.0/business-process";
     return this.httpClient.post(url, payload);
  }
  public getBusinessProcessByOrg() {
    let url = environment.apiBase + 'v1.0/business-process' ;
    return this.httpClient.get(url);
  }
  public getBusinessProcessById(id) {
    let url = environment.apiBase + 'v1.0/business-process/' + id;
    return this.httpClient.get(url);
  }
  public updateBusinessProcess(payload){
    let url = environment.apiBase + 'v1.0/business-process/update/'+payload.id;
    console.log("Final url for update BP "+url); 
    return this.httpClient.put(url,payload);
    }
}
