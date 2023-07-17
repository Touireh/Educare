import { Component, OnInit } from '@angular/core';
import { Crud3Service } from '../service/crud3.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    Donations:any = [];

    constructor(private crud3Service: Crud3Service,private authService: AuthService) { }

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

}
