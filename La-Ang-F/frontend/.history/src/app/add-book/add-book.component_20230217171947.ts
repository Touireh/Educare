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
  
  showForm = false;
  showForm2 = true;
  activiteForm: FormGroup;
  Activites:any = [];

  studentsCount: number;
  usersCount: number;
  actCount: number;

  donationForm: FormGroup;
  Donations:any = [];
  totalAmount: number;

  getId:any;
  updateForm: FormGroup;

  constructor(
    public formBiulder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private activateRoute: ActivatedRoute,
    private crudService: CrudService,
    private crud2Service: Crud2Service,
    private crud3Service: Crud3Service
  ) { 
     this.getId = this.activateRoute.snapshot.paramMap.get('id');
     this.activiteForm = this.formBiulder.group({
       name: [''],
       type: [''],
       description: [''],
     })
     this.updateForm = this.formBiulder.group({
      name: [''],
      type: [''],
      description: [''],
    })
    this.crudService.getActivite(this.getId).subscribe(res=>{
      console.log(res['activite'])
      this.updateForm.setValue({
        name: res['activite']['name'],
        type: res['activite']['type'],
        description: res['activite']['description'],
      });
    });
  }

  ngOnInit(): void {
    this.crudService.getActivites().subscribe( res=>{
      console.log(res)
      this.Activites = res;
    })
    this.crud3Service.getDonations().subscribe( res=>{
      console.log(res)
      this.Donations = res;
      this.totalAmount = this.Donations.reduce((a, b) => a + b.montant, 0);
      })
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
    this.crudService.getUsers().subscribe(res => {
      this.usersCount = Array.isArray(res) ? res.length : 0;
    });
  }
  getActsCount() {
    this.crudService.getActivites().subscribe(res => {
      this.actCount = Array.isArray(res) ? res.length : 0;
    });
  }

  onSubmit():any{
    this.crudService.addActivite(this.activiteForm.value)
    .subscribe(()=>{
      console.log('Data added successfully')
      this.ngZone.run(()=> this.router.navigateByUrl('/add-activite'))
      window.location.reload();
    },(err)=>{
      console.log(err)
    })
  }

  delete(id:any,i:any){
    console.log(id);
    this.crudService.deleteActivite(id).subscribe(res => {
     
      this.Activites.splice(i,1);
    })
  }

  onUpdate(): any {
    this.crudService.updateActivite(this.getId,this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully')
        window.location.reload();
      }, (err) => {
        console.log(err)
      })
  }














  /***haadiii likqn khdaama kayna update ms makaynchi les valeurs  
  showForm = false;
  showForm2 = true;
  bookForm: FormGroup;
  Users:any = [];
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
     this.updateForm = this.formBiulder.group({
      name: [''],
      email: [''],
      password: [''],
    })
     this.crudService.getUser(this.getId).subscribe(res=>{
      console.log(res['user'])
      this.updateForm.setValue({
        name: res['user']['name'],
        email: res['user']['email'],
        password: res['user']['password'],
      });
    });
    this.crud3Service.getDonations().subscribe( res=>{
    console.log(res)
    this.Donations = res;
    this.totalAmount = this.Donations.reduce((a, b) => a + b.montant, 0);
    })
  }

  ngOnInit(): void {
    this.crudService.getUsers().subscribe( res=>{
      console.log(res)
      this.Users = res;
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
    this.crudService.getUsers().subscribe(res => {
      this.usersCount = Array.isArray(res) ? res.length : 0;
    });
  }
  getActsCount() {
    this.crudService.getActivites().subscribe(res => {
      this.actCount = Array.isArray(res) ? res.length : 0;
    });
  }
  

  onSubmit():any{
    this.crudService.addUser(this.bookForm.value)
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
    this.crudService.deleteUser(id).subscribe(res => {
      this.Users.splice(i,1);
    })
  }

  onUpdate(): any {
      this.crudService.updateUser(this.getId,this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully')
        window.location.reload();
      }, (err) => {
        console.log(err)
      })
  }*/
}
