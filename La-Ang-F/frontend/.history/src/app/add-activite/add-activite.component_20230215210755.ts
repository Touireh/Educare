import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
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

  constructor(
    public formBiulder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudService: CrudService,
    private crud3Service: Crud3Service
  ) { 
     this.activiteForm = this.formBiulder.group({
       name: [''],
       type: [''],
       description: [''],
     })
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
