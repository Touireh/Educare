import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Crud3Service } from '../service/crud3.service';
import { Crud2Service } from '../service/crud2.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css','./css/sb-admin-2.min.css','./css/sb-admin-2.css','./vendor/fontawesome-free/css/all.min.css']
})
export class AdmindashboardComponent implements OnInit {

  studentsCount: number;
  usersCount: number;
  actCount: number;

  Books:any=[];
  Enfants:any = [];
  Activites:any = [];

  donationForm: FormGroup;
  Donations:any = [];
  totalAmount: number;
  
  constructor(private crudService: CrudService , private crud2Service: Crud2Service ,private crud3Service: Crud3Service,public formBiulder:FormBuilder, public router:Router ) {
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
    this.crudService.getBooks().subscribe(res => {
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
    this.crud2Service.deleteEnfant(id).subscribe(res => {
     
      this.Enfants.splice(i,1);
    })
  }

  onEdit(id: any) {
    this.router.navigate(['/add-book/' + id]);
  }

  onEdit2(id: any) {
    this.router.navigate(['/add-child/' + id]);
  }
  
}
