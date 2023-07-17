import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // importer le Router


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;

  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (email === 'admin@gmail.com') { // Vérifie si l'email est "admin@gmail.com"
      this.router.navigate(['/admindashboard']); // naviguer vers /landing si l'email est "admin@gmail.com"
    } else {
      this.router.navigate(['/parent']);
    }
  }
}