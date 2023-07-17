import { Component, OnInit ,NgZone} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
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
  
  studentsCount: number;
  usersCount: number;
  actCount: number;

    showForm = false;
    enfantForm: FormGroup;
    Enfants:any = [];

    donationForm: FormGroup;
    Donations:any = [];
    totalAmount: number;

    getId:any;
    updateForm: FormGroup;
  
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
      private activateRout: ActivatedRoute,
      private crudService: Crud2Service,
      private crud1Service: CrudService,
      private crud3Service: Crud3Service
    ) { 
      this.getId = this.activateRout.snapshot.paramMap.get('id');
       this.enfantForm = this.formBiulder.group({
        fname: [''],
        lname : [''],
        age: [''],
        Parent: [''],
        maladie: [''],
        annee: [''],
       })
    this.crudService.getEnfant(this.getId).subscribe(res=>{
      console.log(res['enfant'])
      this.updateForm.setValue({
        fname: res['enfant']['fname'],
        lname: res['enfant']['lname'],
        age: res['enfant']['age'],
        Parent: res['enfant']['Parent'],
        maladie: res['enfant']['maladie'],
        annee: res['enfant']['annee'],
      });
    });
       this.crud3Service.getDonations().subscribe( res=>{
        console.log(res)
        this.Donations = res;
        this.totalAmount = this.Donations.reduce((a, b) => a + b.montant, 0);
        })
        this.updateForm = this.formBiulder.group({
          fname: [''],
            lname : [''],
            age: [''],
            Parent: [''],
            maladie: [''],
            annee: [''],
        })
    }
  
    ngOnInit(): void {
      this.crudService.getEnfants().subscribe( res=>{
        console.log(res)
        this.Enfants = res;
      })
      this.getId = this.activateRout.snapshot.paramMap.get('id');
      if (this.getId) {
      this.showForm = true;
      }
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

    onSubmit():any{
      this.crudService.addEnfant(this.enfantForm.value)
      .subscribe(()=>{
        console.log('Data added successfully')
        this.ngZone.run(()=> this.router.navigateByUrl('/books-list'));
        window.location.reload();
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

    onUpdate(): any {
      this.crudService.updateEnfant(this.getId,this.updateForm.value)
        .subscribe(() => {
          console.log('Data updated successfully')
          window.location.reload();
        }, (err) => {
          console.log(err)
        })
    }
  }
  
