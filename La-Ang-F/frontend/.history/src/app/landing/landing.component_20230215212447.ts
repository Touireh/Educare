import { Component, OnInit ,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { Crud3Service } from '../service/crud3.service';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  Donations:any = [];

  constructor(
    private ngZone:NgZone,
    private router:Router,
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

}
