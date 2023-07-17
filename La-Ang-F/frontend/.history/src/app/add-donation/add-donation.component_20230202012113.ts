import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { Crud3Service } from '../service/crud3.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css']
})
export class AddDonationComponent implements OnInit {

    thankYouMessage = '';
    errorMessage = '';
    formSubmitted = false;
    donationForm: FormGroup;
    Donations:any = [];
    constructor(
      public formBiulder:FormBuilder,
      private router:Router,
      private ngZone:NgZone,
      private crudService: Crud3Service
    ) { 
       this.donationForm = this.formBiulder.group({
        name: [''],
        email : [''],
        cin: [''],
        montant: [''],
       })
    }

    ngOnInit(): void {
      this.crudService.getDonations().subscribe( res=>{
        console.log(res)
        this.Donations = res;
      })
    }  

    onSubmit():any{
      this.crudService.addDonation(this.donationForm.value)
      .subscribe(()=>{
        console.log('Data added successfully')
        this.ngZone.run(()=> this.router.navigateByUrl('/donat'))
      },(err)=>{
        console.log(err)
      })
  }
  
  onDonate(form: NgForm) {
    if (form.valid) {
      this.thankYouMessage = 'Thank you so much ';
      this.formSubmitted = true;
      this.onSubmit();
    }else{
      this.errorMessage =`Please complete the form first :) ${this.donationForm.get('name').value}`;
    }
  }
}
