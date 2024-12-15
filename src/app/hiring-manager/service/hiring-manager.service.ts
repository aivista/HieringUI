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

  login(data: any) {
    return this.http.post(POSTurl.login, data);
  }

  getHiringManagerJobs(hiringManagerID: string) {
    const url = `${GETurl.jobDetails}${hiringManagerID}`;
    return this.http.get(url);
  }
}
