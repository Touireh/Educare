import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Crud2Service } from '../service/crud2.service';
import { Crud3Service } from '../service/crud3.service';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css','../admindashboard/css/sb-admin-2.min.css','../admindashboard/css/sb-admin-2.css','../admindashboard/vendor/fontawesome-free/css/all.min.css','../admindashboard/css/message.css']
})
export class MessageComponent implements OnInit {

  studentsCount: number;
  usersCount: number;
  actCount: number;
  
  totalAmount: number;
  Donations:any = [];
  showMessages = false;
  messages: any;

  REST_API: string = 'http://127.0.0.1:8000/api/messages';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  constructor(private crudService: CrudService,private crud2Service: Crud2Service,private crud3Service: Crud3Service,private httpClient: HttpClient, private authService: AuthService) { 

  }

  ngOnInit(): void {
    this.crud3Service.getDonations().subscribe( res=>{
      console.log(res)
      this.Donations = res;
      this.totalAmount = this.Donations.reduce((a, b) => a + b.montant, 0);
      })
      this.getMessages();
      this.crudService.getBooks().subscribe(res=>{
      console.log(res)
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

  onLogout() {
    this.authService.logout();
  }

}
