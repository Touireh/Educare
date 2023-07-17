import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Crud3Service } from '../service/crud3.service';
import { Crud2Service } from '../service/crud2.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';



@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss','./css/sb-admin-2.min.css','./css/sb-admin-2.css','./css/message.css','./vendor/fontawesome-free/css/all.min.css']
})
export class AdmindashboardComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  REST_API: string = 'http://127.0.0.1:8000/api/messages';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  studentsCount: number;
  usersCount: number;
  actCount: number;

  Books:any=[];
  Users:any=[];
  Enfants:any = [];
  Activites:any = [];

  donationForm: FormGroup;
  Donations:any = [];
  totalAmount: number;

  showMessages = false;
  messages: any;

  constructor(private crudService: CrudService , private crud2Service: Crud2Service ,private crud3Service: Crud3Service,public formBiulder:FormBuilder, public router:Router ,private authService: AuthService,private httpClient: HttpClient) {
    this.donationForm = this.formBiulder.group({
      name: [''],
      email : [''],
      cin: [''],
      montant: [''],
     })
   }

  ngOnInit(): void {
    this.getMessages();
    this.crudService.getBooks().subscribe(res=>{
      console.log(res)
      this.Books=res;
    })  
    this.crudService.getUsers().subscribe(res=>{
      console.log(res)
      this.Users=res;
    })  
    this.crud2Service.getEnfants().subscribe( res=>{
      console.log(res)
      this.Enfants = res;
    })
    this.crudService.getActivites().subscribe( res=>{
      console.log(res)
      this.Activites = res;
    })
     this.crud3Service.getDonations().subscribe( res=>{
      console.log(res)
      this.Donations = res;
      this.totalAmount = this.Donations.reduce((a, b) => a + b.montant, 0);
      })
      this.getStudentsCount();
      this.getUsersCount();
      this.getActsCount();
  }

  getStudentsCount() {
    this.crud2Service.getEnfants().subscribe(res => {
      this.studentsCount = Array.isArray(res) ? res.length : 0;
    });
  }
  getUsersCount() {
    this.crudService.getUsers().subscribe(res => {
      this.usersCount = Array.isArray(res) ? res.length : 0;
    });
  }
  getActsCount() {
    this.crudService.getActivites().subscribe(res => {
      this.actCount = Array.isArray(res) ? res.length : 0;
    });
  }
 
  delete(id:any,i:any){
    console.log(id);
    this.crudService.deleteBook(id).subscribe(res=>{
      this.Books.splice(i,1);
    })

    console.log(id);
    this.crudService.deleteUser(id).subscribe(res=>{
      this.Users.splice(i,1);
    })

    console.log(id);
    this.crud2Service.deleteEnfant(id).subscribe(res => {
      this.Enfants.splice(i,1);
    })
    console.log(id);
      this.crudService.deleteActivite(id).subscribe(res => {
        this.Activites.splice(i,1);
      })
  }

  onLogout() {
    this.authService.logout();
  }

  onEdit(id: any) {
    this.router.navigate(['/add-book/' + id]);
  }

  onEdit2(id: any) {
    this.router.navigate(['/add-child/' + id]);
  }
  onEdit3(id: any) {
    this.router.navigate(['/add-activite/' + id]);
  }

  onSubmit(){
    this.showMessages=true;
  }

  toggleMessageDropdown() {
    this.showMessages = !this.showMessages;
  }
  
  getMessages() {
    this.httpClient.get(this.REST_API).subscribe((data) => {
      this.messages = data;
    });
  }
}

