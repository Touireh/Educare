import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Crud2Service } from '../service/crud2.service';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css','../admindashboard/css/sb-admin-2.min.css','../admindashboard/css/sb-admin-2.css','../admindashboard/vendor/fontawesome-free/css/all.min.css','../admindashboard/css/message.css']
})
export class MessageComponent implements OnInit {

  studentsCount: number;
  usersCount: number;
  actCount: number;
  totalAmount: number;
  constructor(private crudService: CrudService,private crud2Service: Crud2Service) { }

  ngOnInit(): void {
  }

  getStudentsCount() {
    this.crud2Service.getEnfants().subscribe(res => {
      this.studentsCount = Array.isArray(res) ? res.length : 0;
    });
  }
  getUsersCount() {
    this.crudService.getUsers().subscribe(res => {
      this.usersCount = Array.isArray(res) ? res.length : 0;
    });
  }
  getActsCount() {
    this.crudService.getActivites().subscribe(res => {
      this.actCount = Array.isArray(res) ? res.length : 0;
    });
  }

}
