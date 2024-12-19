import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(private _http: HttpClient) {}

  summaryOfJobDescription(jobId: any): Promise<any> {
    return this._http
      .get(`${environment.avatarEndPoint}/Speech/summarize-jd/${jobId}`)
      .toPromise();
  }

  candidateProfile(candidateId: any): Promise<any> {
    return this._http
      .get(
        `${environment.avatarEndPoint}/Speech/candidate-profile/${candidateId}`
      )
      .toPromise();
  }

  saveFile(body: any): Observable<any> {
    return this._http.post(
      `${environment.avatarEndPoint}/File/save-file`,
      body
    );
  }

  saveVideo(formData: any): Observable<any> {
    return this._http.post(
      `${environment.avatarEndPoint}/Video/upload`,
      formData
    );
  }

  getRoleFromJobDescription(jobId: any): Promise<any> {
    return this._http
      .get(
        `${environment.avatarEndPoint}/Speech/find-role-from-job-description/${jobId}`
      )
      .toPromise();
  }

  speak(
    speech: any,
    contextual: boolean,
    coreSkillQuestion: boolean,
    jd: any,
    isItCandidateQuestion: boolean
  ): Promise<any> {
    return this._http
      .post(
        `${environment.avatarEndPoint}/Speech/recognize?speech=${speech}&contextual=${contextual}&coreSkillQuestion=${coreSkillQuestion}&isItCandidateQuestion=${isItCandidateQuestion}`,
        jd
      )
      .toPromise();
  }

  getJobDescription(jobId: any): Promise<any> {
    return this._http
      .get(`${environment.avatarEndPoint}/Speech/job-description/${jobId}`)
      .toPromise();
  }
}
