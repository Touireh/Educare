import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';



import { LoginComponent } from './login/login.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee/employee.component';
import { AddChildComponent } from './add-child/add-child.component';
import { ChildListComponent } from './child-list/child-list.component';
import { AddDonationComponent } from './add-donation/add-donation.component';
import { AddActiviteComponent } from './add-activite/add-activite.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AddBookComponent,
    BookListComponent,
    EmployeeComponent,
    AddChildComponent,
    ChildListComponent,
    AddDonationComponent,
    AddActiviteComponent,
    AdmindashboardComponent,
    ParentComponent,

    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
