import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { Crud3Service } from '../service/crud3.service';
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
        this.ngZone.run(()=> this.router.navigateByUrl('/landing'))
      },(err)=>{
        console.log(err)
      })
    }

    onSubmit():any{
      this.crudService.addDonation(this.donationForm.value)
      .subscribe(()=>{
        console.log('Data added successfully')
        this.ngZone.run(()=> this.router.navigateByUrl('/books-list'))
      },(err)=>{
        console.log(err)
      })
  }
