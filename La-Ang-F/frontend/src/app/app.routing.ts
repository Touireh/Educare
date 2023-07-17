import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddChildComponent } from './add-child/add-child.component';
import { ChildListComponent } from './child-list/child-list.component';
import { AddDonationComponent } from './add-donation/add-donation.component';
import { AddActiviteComponent } from './add-activite/add-activite.component';
import {AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ParentComponent } from './parent/parent.component';
import { MessageComponent } from './message/message.component';

const routes: Routes =[
    /*{ path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'book-list',          component: BookListComponent },
    { path: 'edit-book/:id', component: BookDetailComponent },
    { path: 'add-book/:id', component: AddBookComponent },
    { path: 'edit-child/:id', component: ChildListComponent },
    { path: 'donat',          component: AddDonationComponent },
    { path: 'add-activite',          component: AddActiviteComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'admindashboard', component: AdmindashboardComponent },
    { path: 'parent',          component: ParentComponent },
    { path: 'add-child',          component: AddChildComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }*/

    { path: 'user-profile',     component: ProfileComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'add-book/:id', component: AddBookComponent },
    { path: 'add-activite/:id', component: AddActiviteComponent },
    { path: 'edit-child/:id', component: ChildListComponent },
    { path: 'donat',          component: AddDonationComponent },
    { path: 'add-activite',          component: AddActiviteComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'admindashboard', component: AdmindashboardComponent },
    { path: 'add-child/:id',          component: AddChildComponent },
    { path: 'parent',          component: ParentComponent },
    { path: 'add-child',          component: AddChildComponent },
    { path: 'message',          component: MessageComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
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
