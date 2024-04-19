import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  changePassword(
    username: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const url = `http://localhost:8080/api/change-password`;
    const body = { username, currentPassword, newPassword };
    return this.http.post(url, body);
  }
}
