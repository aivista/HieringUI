import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { POSTurl } from '../../config';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  url = environment.apiBaseUrl;
  jobservice=environment.jobService
  jobSubscribe=new Subject()
  constructor(private http: HttpClient, private route: Router) {}

  setData(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
  getData(key: string) {
    const data = sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  Candidatelogin(data: any) {
    return this.http.post(this.url+'login/candidate', data);
  }

}
