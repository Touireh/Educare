import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/api';
  user: any;

  name: string;
  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) { }

 
  username: string;
  typescript
  
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/utilisateur/login`, {email, password}).subscribe(
      (response: any) => {
        console.log(response); // ajouter cette ligne pour déboguer la réponse de l'API
        localStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        this.email = email; // stocker l'email dans le service
        this.password = password; // stocker le mot de passe dans le service
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
    //return sessionStorage.getItem('user.name')+"test"; // Retrieve the user's name from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user'));
  return user ? user.name+ : null;
  }

  getEmail() {
    return this.email; // Retrieve the user's name from sessionStorage
  }

  getPassword() {
    return this.password; // Retrieve the user's name from sessionStorage
  }
  
  getName() {
    return this.name+"test";
  }
}