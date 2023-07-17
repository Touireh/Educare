import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Crud2Service } from '../service/crud2.service';
import { Crud3Service } from '../service/crud3.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-activite',
  templateUrl: './add-activite.component.html',
  styleUrls: ['./add-activite.component.css','../admindashboard/css/sb-admin-2.min.css','../admindashboard/css/sb-admin-2.css','../admindashboard/vendor/fontawesome-free/css/all.min.css']
})
export class AddActiviteComponent implements OnInit {

  showForm = false;
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
    private activateRout: ActivatedRoute,
    private crudService: CrudService,
    private crud2Service: Crud2Service,
    private crud3Service: Crud3Service
  ) { 
    this.getId = this.activateRout.snapshot.paramMap.get('id');
     this.activiteForm = this.formBiulder.group({
       name: [''],
       type: [''],
       description: [''],
     })
     this.crudService.getEnfant(this.getId).subscribe(res=>{
      console.log(res['enfant'])
     this.updateForm.setValue({
      name: res['enfant']['fname'],
      type: res['enfant']['lname'],
      description: res['enfant']['age'],
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

}
