import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// import { Router } from '@angular/router';
// import { POSTurl } from '../../config';
import { environment } from '../../../environments/environment';
import { GETurl, POSTurl } from '../../config';
@Injectable({
  providedIn: 'root',
})
export class HiringManagerService {
  url = environment.apiBaseUrl;

  jobservice = environment.jobService;
  jobDetails = environment.jobDetails;
  jobSubscribe = new Subject();

  assessment = environment.assessment;

  constructor(private http: HttpClient) {}

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

  login(data: any) {
    return this.http.post(POSTurl.hiringmanagerLogin, data);
  }

  getHiringManagerJobs(data: string) {
    // const url = this.jobservice + 'jobs/' + data;
    return this.http.get(GETurl.jobDetails + data);
  }
  getShortlistedJobs(id: string) {
    return this.http.get(GETurl.jobShortListed + id);
  }

  getAppliedJobs(id: string) {
    return this.http.get(GETurl.appliedJobs + id);
  }

  getJobsDesc() {
    const url = GETurl.getJobDescription;
    return this.http.get(url);
  }
  getUpcomingInterview(jobId: string, managerId: string) {
    return this.http.get(GETurl.upcomingInterview + jobId + '/' + managerId);
  }

  createJobs(data: any) {
    const url = GETurl.createdJob;
    return this.http.post(url, data);
  }

  candidateStatus(jobId: string, CandidateId: string) {
    return this.http.get(GETurl.candidateStatus + jobId + '/' + CandidateId);
  }

  CandidateDetails(data: any) {
    return this.http.post(POSTurl.candidateDetails, data);
  }

  callProfileUpdateJurney(data: any) {
    return this.http.post(POSTurl.callProfileUpdateJurney, data);
  }
}
