import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { POSTurl, PUTurl } from '../../config';
import { GETurl } from '../../config';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiResponse, Question } from '../../interfaces/interface';
import { Profile } from '../interface/Profile';
@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  url = environment.ProfileServicesUrl;
  jobservice = environment.JobServiceUrl;
  assessment = environment.AssessmentServicesUrl;
  // jobSubscribe = new Subject();
  assessmentId = new Subject();
  candidateId = new Subject();
  profile: Profile | undefined = undefined;
  jobdetails: any | undefined = undefined;
  $ProfilsdataSubject = new BehaviorSubject<Profile | undefined>(this.profile);
  $jobDetailsSubject = new BehaviorSubject<any | undefined>(this.jobdetails);

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
    return this.http.get(
      GETurl.candidateStatus + data.jobid + '/' + data.candidateid
    );
  }
  Candidatelogin(data: any) {
    return this.http.post(POSTurl.candidateLogin, data);
  }
  CandidateDetails(data: any) {
    return this.http.post(POSTurl.candidateDetails, data);
  }

  getRecentlyAppliedJobs(candidateId: number) {
    const url = GETurl.appliedjobsByCandidate + candidateId;
    return this.http.get(url);
  }

  getJobQuestions(
    aid: number,
    jobId: number,
    cid: number
  ): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      GETurl.getMCQ + `/${aid}/${jobId}/${cid}`
    );
  }
  evaluateMcq(jsonBody: any) {
    return this.http.post(POSTurl.evaluateMCQ, jsonBody);
  }

  UpdateProfileUpdateStatus(jsonBody: any) {
    return this.http.post(POSTurl.callProfileUpdateJurney, jsonBody);
  }
  getcandidateInterviewtime(jsonBody: any) {
    return this.http.post(POSTurl.interviewSechudle, jsonBody);
  }

  updateProfile(jsonBody: any) {
    return this.http.put(PUTurl.updateProfileUrl, jsonBody);
  }
}
