import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router'; 
import { POSTurl } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class HiringManagerService {

  constructor(
    private http: HttpClient, 
    private route: Router, 
  ) {}

  login(data: any) {
    return this.http.post(POSTurl.login, data);
  }
}
