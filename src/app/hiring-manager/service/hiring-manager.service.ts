import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GETurl } from '../../config';
import { Router } from '@angular/router';
import { POSTurl } from '../../config';
@Injectable({
  providedIn: 'root',
})
export class HiringManagerService {
  constructor(private http: HttpClient) {}

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
    return this.http.post(POSTurl.login, data);
  }

  getHiringManagerJobs(hiringManagerID: string) {
    const url = `${GETurl.jobDetails}${hiringManagerID}`;
    return this.http.get(url);
  }
}
