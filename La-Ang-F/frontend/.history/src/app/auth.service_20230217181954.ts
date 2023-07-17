import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/api';
  user: any;

  constructor(private http: HttpClient, private router: Router) { }

 
  typescript
  
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {email, password}).subscribe(
      (response: any) => {
        console.log(response); // ajouter cette ligne pour déboguer la réponse de l'API
        localStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
  
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

  getUserInfo() {
    return this.http.get(`${this.apiUrl}/users`).pipe(
      tap((user: any) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.user = user;
      })
    );
  }
  getUserName() {
    return sessionStorage.getItem('user_name'); // Retrieve the user's name from sessionStorage
  }
}