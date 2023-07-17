import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddChildComponent } from './add-child/add-child.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { UsersComponent } from './users/users.component';
import { EmployeeComponent } from './employee/employee/employee.component';

const routes: Routes =[
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'book-list',          component: BookListComponent },
    { path: 'edit-book/:id', component: BookDetailComponent },
    //{ path: 'add-book',          component: AddBookComponent },
    //{ path: 'add-book',          component: UsersComponent },
    //{ path: 'add-book',          component: EmployeeComponent },
    { path: 'add-child',          component: AddChildComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' },


    { path: 'add-book', component: AddBookComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
