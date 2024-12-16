import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { POSTurl } from '../../config';
import { GETurl } from '../../config';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ApiResponse,Question } from '../../interfaces/interface';
@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  url = environment.apiBaseUrl;
  jobservice = environment.jobService;
  assessment = environment.assessment;
  // jobSubscribe = new Subject();
  assessmentId=new Subject()
  

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
    return this.http.post(POSTurl.candidateLogin, data);
  }
  CandidateDetails(data: any) {
    return this.http.post(POSTurl.candidateDetails, data);
  }

  getRecentlyAppliedJobs(candidateId: number) {
    const url = GETurl.appliedjobsByCandidate+candidateId
    return this.http.get(url);
  }

  getJobQuestions(aid: number, jobId: number, cid: number):Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      this.assessment +
        `ASSESSMENTSERVICE/ASSESSMENT/${aid}/JOB/${jobId}/CANDIDATE/${cid}/GETMCQ`
    );
  }
  evaluateMcq(jsonBody:any) {
    return this.http.post(
      POSTurl.evaluateMCQ,jsonBody
    );
  }
}
