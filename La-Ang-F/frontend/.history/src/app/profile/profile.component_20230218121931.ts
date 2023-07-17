import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    Donations:any = [];

    constructor() { }

    ngOnInit() {
        this.crud3Service.getDonations().subscribe( res=>{
            console.log(res)
            this.Donations = res;
            this.Donations.sort((a, b) => b.montant - a.montant);
          })
    }

}
