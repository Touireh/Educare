/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {email, password}).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/parent']); // Redirection vers "/landing"
      },
      (error) => console.log(error)
    );
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  /*login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {email, password}).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/parent']);
      },
      (error) => console.log(error)
    );
  }*/

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {email, password}).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        if (email === 'admin@gmail.com') {
          sessionStorage.setItem('isAdmin', 'true');
          this.router.navigateByUrl('/admindashboard');
        } else {
          this.router.navigate(['/parent']);
        }
      },
      (error) => console.log(error)
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('access_token');
    return this.http.post(`${this.apiUrl}/utilisateur/logout`, {})
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
  }
}

