import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GETurl } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class HiringManagerService {
  constructor(private http: HttpClient) {}

  getHiringManagerJobs(hiringManagerID: string) {
    const url = `${GETurl.jobDetails}${hiringManagerID}`;
    return this.http.get(url);
  }
}
