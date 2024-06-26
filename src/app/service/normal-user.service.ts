import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NormalUserService {

  private baseUrl = 'http://localhost:8181'; //Spring boot url

  constructor(private http: HttpClient, private loginService: LoginService) { }

  
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/`, user);
  }

  postQueries(query: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.loginService.getToken());
    return this.http.post(`${this.baseUrl}/user/query`, query, {headers});
  }

  getUser(userId:any): Observable<any> {
    const url = `${this.baseUrl}/user/getUser/${userId}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.loginService.getToken());
    return this.http.get<any>(url, {headers});
  }
}


