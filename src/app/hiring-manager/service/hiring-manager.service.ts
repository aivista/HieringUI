import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Router } from '@angular/router';
import { POSTurl } from '../../config';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HiringManagerService {
  url = environment.apiBaseUrl;
  jobservice=environment.jobService
  jobSubscribe=new Subject()
  constructor(private http: HttpClient) {
 
  }

  setData(key:string,data:any){

    sessionStorage.setItem(key,JSON.stringify(data));
  }
  getData(key:string){
    const data=sessionStorage.getItem(key)
    if(data){
      return JSON.parse(data)
    }
    return []
  }

  login(data: any) {
    return this.http.post(this.url+'login/hiringmanager', data);
  }

  getHiringManagerJobs(data: string) {
    const url = this.jobservice+'jobs/'+data;
    return this.http.get(url);
  }
getShortlistedJobs(id:string){
return this.http.get(this.jobservice+'Jobs/LatestStatus/ShortListed/'+id)
}
}