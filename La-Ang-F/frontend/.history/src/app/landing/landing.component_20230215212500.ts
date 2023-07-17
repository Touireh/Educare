import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { Crud2Service } from '../service/crud2.service';
import { Crud3Service } from '../service/crud3.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  Donations:any = [];
  messageForm: FormGroup;
  Messages:any = [];

  constructor(
    private ngZone:NgZone,
    private router:Router,
    public formBiulder:FormBuilder,
    private crud2Service: Crud2Service,
    private crudService: Crud3Service
  ) { 
    this.messageForm = this.formBiulder.group({
      name: [''],
      email : [''],
      message: [''],
     })
   }

  ngOnInit(): void {
    this.crudService.getDonations().subscribe( res=>{
      console.log(res)
      this.Donations = res;
      this.Donations.sort((a, b) => b.montant - a.montant);
    })
  }

  onSubmit():any{
    this.crud2Service.addMessage(this.messageForm.value)
    .subscribe(()=>{
      console.log('Data added successfully')
      this.ngZone.run(()=> this.router.navigateByUrl('/landing'));
      window.location.reload();
    },(err)=>{
      console.log(err)
    })
  }

}
