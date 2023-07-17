import { Component, OnInit ,NgZone} from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Crud2Service } from '../service/crud2.service';
import { Crud3Service } from '../service/crud3.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css','../admindashboard/css/sb-admin-2.min.css','../admindashboard/css/sb-admin-2.css','../admindashboard/vendor/fontawesome-free/css/all.min.css']
})
export class AddBookComponent implements OnInit {
  /*
  showForm = false;
  showForm2 = true;
  bookForm: FormGroup;
  Books:any = [];
  
  getId:any;
  updateForm: FormGroup;

  donationForm: FormGroup;
  Donations:any = [];
  totalAmount: number;

  studentsCount: number;
  usersCount: number;
  actCount: number;
  

  constructor(
    public formBiulder:FormBuilder,
    private router:Router,
    private activateRoute: ActivatedRoute,
    private ngZone:NgZone,
    private crudService: CrudService,
    private crud2Service: Crud2Service,
    private crud3Service: Crud3Service
  ) { 
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
     this.bookForm = this.formBiulder.group({
       name: [''],
       price: [''],
       description: [''],
     })
     this.crudService.getBook(this.getId).subscribe(res=>{
      console.log(res['book'])
      this.updateForm.setValue({
        name: res['book']['name'],
        price: res['book']['price'],
        description: res['book']['description'],
      });
    });

    this.updateForm = this.formBiulder.group({
      name: [''],
      price: [''],
      description: [''],
    })
     this.crud3Service.getDonations().subscribe( res=>{
      console.log(res)
      this.Donations = res;
      this.totalAmount = this.Donations.reduce((a, b) => a + b.montant, 0);
      })
  }

  ngOnInit(): void {
    this.crudService.getBooks().subscribe( res=>{
      console.log(res)
      this.Books = res;
    })
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    if (this.getId) {
      this.showForm = true;
      this.showForm2=false;
    }
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
  

  onSubmit():any{
    this.crudService.addBook(this.bookForm.value)
    .subscribe(()=>{
      console.log('Data added successfully')
      this.ngZone.run(()=> this.router.navigateByUrl('/add-book'));
      window.location.reload();
    },(err)=>{
      console.log(err)
    })
  }

  delete(id:any,i:any){
    console.log(id);
    this.crudService.deleteBook(id).subscribe(res => {
     
      this.Books.splice(i,1);
    })
  }

  onUpdate(): any {
    this.crudService.updateBook(this.getId,this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully')
        window.location.reload();
      }, (err) => {
        console.log(err)
      })
  }*/

  showForm = false;
  showForm2 = true;
  bookForm: FormGroup;
  Books:any = [];
  
  getId:any;
  updateForm: FormGroup;

  donationForm: FormGroup;
  Donations:any = [];
  totalAmount: number;

  studentsCount: number;
  usersCount: number;
  actCount: number;
  

  constructor(
    public formBiulder:FormBuilder,
    private router:Router,
    private activateRoute: ActivatedRoute,
    private ngZone:NgZone,
    private crudService: CrudService,
    private crud2Service: Crud2Service,
    private crud3Service: Crud3Service
  ) { 
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.bookForm = this.formBiulder.group({
       name: [''],
       email: [''],
       password: [''],
     })
     this.crudService.getUser(this.getId).subscribe(res=>{
      console.log(res['user'])
      this.updateForm.setValue({
        name: res['book']['name'],
        price: res['book']['price'],
        description: res['book']['description'],
      });
    });

    this.updateForm = this.formBiulder.group({
      name: [''],
      price: [''],
      description: [''],
    })
     this.crud3Service.getDonations().subscribe( res=>{
      console.log(res)
      this.Donations = res;
      this.totalAmount = this.Donations.reduce((a, b) => a + b.montant, 0);
      })
  }

  ngOnInit(): void {
    this.crudService.getBooks().subscribe( res=>{
      console.log(res)
      this.Books = res;
    })
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    if (this.getId) {
      this.showForm = true;
      this.showForm2=false;
    }
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
  

  onSubmit():any{
    this.crudService.addBook(this.bookForm.value)
    .subscribe(()=>{
      console.log('Data added successfully')
      this.ngZone.run(()=> this.router.navigateByUrl('/add-book'));
      window.location.reload();
    },(err)=>{
      console.log(err)
    })
  }

  delete(id:any,i:any){
    console.log(id);
    this.crudService.deleteBook(id).subscribe(res => {
     
      this.Books.splice(i,1);
    })
  }

  onUpdate(): any {
    this.crudService.updateBook(this.getId,this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully')
        window.location.reload();
      }, (err) => {
        console.log(err)
      })
  }
  
}
