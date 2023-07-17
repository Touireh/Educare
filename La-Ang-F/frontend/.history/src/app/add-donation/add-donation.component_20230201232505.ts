import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { Crud2Service } from '../service/crud2.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css']
})
export class AddDonationComponent implements OnInit {

  donationForm: FormGroup;
    Donations:any = [];
    constructor(
      public formBiulder:FormBuilder,
      private router:Router,
      private ngZone:NgZone,
      private crudService: Crud2Service
    ) { 
       this.donationForm = this.formBiulder.group({
        name: [''],
        email : [''],
        cin: [''],
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
