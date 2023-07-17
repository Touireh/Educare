import { Component, OnInit ,NgZone} from '@angular/core';
import { Crud3Service } from '../service/crud3.service';
import { CrudService } from '../service/crud.service';
import { Crud2Service } from '../service/crud2.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../calendar.service';



@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [ dayGridPlugin ],
    initialView: 'dayGridMonth',
    events: [
      { title: 'Sortie Géologique', date: '2023-02-21' },
      { title: 'Compétition Sportive', date: '2023-02-02' }
    ]
  };

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


  constructor(private router:Router,public formBiulder:FormBuilder,private ngZone:NgZone,private crud2Service: Crud2Service,private crud3Service: Crud3Service,private crudService: CrudService,private http: HttpClient,private authService: AuthService ) {
    this.messageForm = this.formBiulder.group({
      name: [''],
      email : [''],
      message: [''],
     })
  }

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

    onSubmit():any{
      this.crud2Service.addMessage(this.messageForm.value)
      .subscribe(()=>{
        console.log('Data added successfully')
        window.location.reload();
      },(err)=>{
        console.log(err)
      })
    }
  }


