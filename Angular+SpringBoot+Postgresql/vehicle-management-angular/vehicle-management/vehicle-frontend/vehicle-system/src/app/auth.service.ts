import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  getUsername(): Observable<string> {
    return this.http.get<string>('http://localhost:8080/api/users/username');
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  changePassword(
    username: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken,
    });

    return this.http.put<any>(
      'http://localhost:8080/api/change-password',
      { username, currentPassword, newPassword },
      { headers }
    );
  }
}
