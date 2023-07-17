import { Component, OnInit } from '@angular/core';
import { Crud2Service } from '../service/crud2.service';
import { Crud3Service } from '../service/crud3.service';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    Donations:any = [];

    constructor(
        private crud3Service: Crud3Service,
        private authService: AuthService,
        private crud2Service: Crud2Service,
        private ngZone:NgZone,
        private router:Router,
        public formBiulder:FormBuilder,) { }

    ngOnInit() {
        this.crud3Service.getDonations().subscribe( res=>{
            console.log(res)
            this.Donations = res;
            this.Donations.sort((a, b) => b.montant - a.montant);
          })
    }

    onLogout() {
        this.authService.logout();
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
