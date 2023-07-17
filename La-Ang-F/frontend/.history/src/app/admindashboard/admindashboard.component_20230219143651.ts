import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Crud3Service } from '../service/crud3.service';
import { Crud2Service } from '../service/crud2.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css','./css/sb-admin-2.min.css','./css/sb-admin-2.css','./vendor/fontawesome-free/css/all.min.css']
})
export class AdmindashboardComponent implements OnInit {

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
  
  constructor(private crudService: CrudService , private crud2Service: Crud2Service ,private crud3Service: Crud3Service,public formBiulder:FormBuilder, public router:Router ,private authService: AuthService) {
    this.donationForm = this.formBiulder.group({
      name: [''],
      email : [''],
      cin: [''],
      montant: [''],
     })
   }

  ngOnInit(): void {
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
  messages = [
    {
      image: './assets/img/brand/undraw_profile_1.svg',
      text: 'Hi there! I am wondering if you can help me with a problem I\'ve been having.',
      sender: 'Emily Fowler',
      time: '58m'
    },
    {
      image: './assets/img/brand/undraw_profile_2.svg',
      text: 'I have the photos that you ordered last month, how would you like them sent to you?',
      sender: 'Jae Chun',
      time: '1d'
    },
    {
      image: './assets/img/brand/undraw_profile_3.svg',
      text: 'Last month\'s report looks great, I am very happy with the progress so far, keep up the good work!',
      sender: 'Morgan Alvarez',
      time: '2d'
    },
    {
      image: 'https://source.unsplash.com/Mv9hjnEUHR4/60x60',
      text: 'Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren\'t good...',
      sender: 'Chicken the Dog',
      time: '2w'
    }
  ];

  showMessages() {
    // Affiche les messages
    console.log(this.messages);
  }

  getMessages(){
    return this.httpClient.get(`${this.REST_API}`);
  }
}

