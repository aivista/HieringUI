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
  jobservice = environment.jobService;
  jobSubscribe = new Subject();
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
  getsteppardata(data: any) {
    const url =
      environment.assessment +
      'ASSESSMENTSERVICE/JOB/' +
      data.jobid +
      '/CANDIDATE/' +
      data.candidateid +
      '/ASSESSMENTSTATE';
    return this.http.get(url);
  }
  Candidatelogin(data: any) {
    return this.http.post(this.url + 'login/candidate', data);
  }
  CandidateDetails(data: any) {
    return this.http.post(this.url + 'login/candidatedetails', data);
  }

  getRecentlyAppliedJobs(candidateId: number) {
    const url = `${this.jobservice}Jobs/LatestStatus/jobs/appliedjobs_by_candidate/${candidateId}`;
    return this.http.get(url);
  }
}
