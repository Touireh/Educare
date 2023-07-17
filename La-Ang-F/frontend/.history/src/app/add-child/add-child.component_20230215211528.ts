import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Crud2Service } from '../service/crud2.service';
import { Crud3Service } from '../service/crud3.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css','../admindashboard/css/sb-admin-2.min.css','../admindashboard/css/sb-admin-2.css','../admindashboard/vendor/fontawesome-free/css/all.min.css']
})

export class AddChildComponent implements OnInit {
  
    showForm = false;
    enfantForm: FormGroup;
    Enfants:any = [];

    donationForm: FormGroup;
    Donations:any = [];
    totalAmount: number;

    studentsCount: number;
    usersCount: number;
    actCount: number;
  
    /*constructor(
      public formBiulder:FormBuilder,
      private router:Router,
      private ngZone:NgZone,
      private crudService: CrudService
    ) { 
       this.bookForm = this.formBiulder.group({
         title: [''],
         price: [''],
         description: [''],
       })
    }*/
  
    constructor(
      public formBiulder:FormBuilder,
      private router:Router,
      private ngZone:NgZone,
      private crud1Service: CrudService,
      private crudService: Crud2Service,
      private crud3Service: Crud3Service
    ) { 
       this.enfantForm = this.formBiulder.group({
        fname: [''],
        lname : [''],
        age: [''],
        Parent: [''],
        maladie: [''],
        annee: [''],
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
      this.crudService.getEnfants().subscribe(res => {
        this.studentsCount = Array.isArray(res) ? res.length : 0;
      });
    }
    getUsersCount() {
      this.crud1Service.getBooks().subscribe(res => {
        this.usersCount = Array.isArray(res) ? res.length : 0;
      });
    }
    getActsCount() {
      this.crud1Service.getActivites().subscribe(res => {
        this.actCount = Array.isArray(res) ? res.length : 0;
      });
    }
  
    ngOnInit(): void {
      this.crudService.getEnfants().subscribe( res=>{
        console.log(res)
        this.Enfants = res;
      })
    }
  
    onSubmit():any{
      this.crudService.addEnfant(this.enfantForm.value)
      .subscribe(()=>{
        console.log('Data added successfully')
        this.ngZone.run(()=> this.router.navigateByUrl('/books-list'))
      },(err)=>{
        console.log(err)
      })
    }
  
    delete(id:any,i:any){
      console.log(id);
      this.crudService.deleteEnfant(id).subscribe(res => {
       
        this.Enfants.splice(i,1);
      })
    }
  }
  
