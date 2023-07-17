import { Component, OnInit } from '@angular/core';
import { Crud3Service } from '../service/crud3.service';
import { CrudService } from '../service/crud.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  Donations:any = [];
  Activites:any = [];


  messageForm: FormGroup;
  Messages:any = [];
  
  user: any;
  email: string;
  password: string;
  
  likes = 0;
  dislikes = 0;

  incrementLikes() {
    this.likes++;
  }

  incrementDislikes() {
    this.dislikes++;
  }


  constructor( private crud3Service: Crud3Service,private crudService: CrudService,private http: HttpClient,private authService: AuthService ) {}

  ngOnInit(): void {
      this.crud3Service.getDonations().subscribe( res=>{
        console.log(res)
        this.Donations = res;
        this.Donations.sort((a, b) => b.montant - a.montant);
      })
      this.crudService.getActivites().subscribe( res=>{
        console.log(res)
        this.Activites = res;
      })
      this.authService.getUserInfo().subscribe(user => {
        this.user = user;
      });
      this.email = this.authService.getEmail();
      this.password = this.authService.getPassword();
    }

    onLogout() {
      this.authService.logout();
    }
  }


