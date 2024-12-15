import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router'; 
import { POSTurl } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private http: HttpClient, 
    private route: Router, 
  ) { }
  Candidatelogin(data: any) {
    return this.http.post(POSTurl.Candidatelogin, data);
  }
}
